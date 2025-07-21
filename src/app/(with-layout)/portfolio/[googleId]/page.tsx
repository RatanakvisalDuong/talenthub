import axios from "axios";
import PortfolioPageComponent from "./portfolio-page";
import { Portfolio } from "../../../type/portfolio";
import PageNotFound from "@/components/pagenotfound/page";
import { Suspense } from "react";
import LoadingScreen from "../../../../components/loadingScreen/loadingScreen";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Fetch portfolio data (reusable function)
async function fetchPortfolioData(googleId: string): Promise<Portfolio | null> {
  try {
    const response = await axios.get(
      `${process.env.API_URL}view_portfolio_details/${googleId}`
    );

    if (response.data.status === 0) {
      return null;
    }

    return response.data as Portfolio;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ googleId: string }>
}): Promise<Metadata> {
  const { googleId } = await params;
  const portfolioData = await fetchPortfolioData(googleId);

  if (!portfolioData) {
    return {
      title: 'Portfolio Not Found - Paragon International University',
      description: 'The requested portfolio could not be found on Paragon International University TalentHub platform.',
    };
  }

  const userName = portfolioData.portfolio.user_name;
  const about = portfolioData.portfolio.about;
  const photo = portfolioData.portfolio.photo;

  const majorName = portfolioData.portfolio.role_id === 1 ?
    portfolioData.portfolio.major || 'Student' : 'Endorser';

  // Extract skills for SEO (prioritize these)
  const skills = portfolioData.skills?.map(skill => skill.title).filter(Boolean) || [];
  
  // Extract experience/work titles for SEO
  const experiences = portfolioData.experiences?.map(exp => exp.work_title).filter(Boolean) || [];
  
  // Extract education info for SEO
  const education = portfolioData.education?.map(edu => edu.education_center).filter(Boolean) || [];

  // Extract projects for SEO
  const projects = portfolioData.projects?.map(proj => proj.title).filter(Boolean) || [];

  // Enhanced title generation - prioritize skills
  let title: string;
  if (skills.length > 0) {
    const primarySkills = skills.slice(0, 3).join(', ');
    title = `${userName} | Paragon International University`;
  } else {
    title = `${userName} Portfolio | Paragon International University`;
  }
  
  // Enhanced description with all metadata context
  let enhancedDescription: string;
  if (skills.length > 0) {
    const skillsList = skills.slice(0, 8).join(', ');
    enhancedDescription = `${userName} is a skilled ${skillsList} developer from Paragon International University. `;
    
    if (about) {
      enhancedDescription += `${about} `;
    }
    
    if (experiences.length > 0) {
      enhancedDescription += `Professional experience as ${experiences.slice(0, 2).join(' and ')}. `;
    }
    
    enhancedDescription += `Specialized in ${skills.slice(0, 5).join(', ')} at ParagonU TalentHub. `;
    
    // Add comprehensive profile metadata to description
    enhancedDescription += `${userName} is a ${skills.length > 0 ? `${skills[0]} Developer` : 'Student'} at Paragon International University majoring in ${majorName}. `;
    enhancedDescription += `Profile includes expertise in ${skills.join(', ')}, professional work experience, educational background, and project portfolio. `;
    enhancedDescription += `Contact ${userName} for ${skillsList} development opportunities, freelance projects, consulting, or full-time positions. `;
    enhancedDescription += `Student Developer Portfolio for Recruiters, Employers, and Academic Community at Paragon International University TalentHub. `;
    enhancedDescription += `Available for remote work, project collaboration, and technical consulting in Cambodia and internationally.`;
  } else {
    enhancedDescription = about || 
      `View ${userName}'s professional portfolio from Paragon International University. ${userName} is a ${majorName} at ParagonU.`;
    
    if (experiences.length > 0) {
      enhancedDescription += ` Experience as ${experiences.slice(0, 3).join(', ')}.`;
    }
    
    enhancedDescription += ` Connect with ${userName} and explore their work, skills, and academic achievements at Paragon University. `;
    enhancedDescription += `Professional portfolio featuring educational background, work experience, projects, and achievements. `;
    enhancedDescription += `Student profile at Paragon International University TalentHub for academic and professional opportunities.`;
  }
  
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`;

  // Enhanced keywords with skills prioritized
  const skillsKeywords = skills.flatMap(skill => [
    skill,
    `${skill} developer`,
    `${skill} programmer`,
    `${skill} specialist`,
    `${skill} expert`,
    `${skill} Paragon International University`,
    `${skill} ParagonU`,
    `${skill} Cambodia`,
    `${skill} developer Cambodia`,
    `${skill} freelancer`,
    `${skill} consultant`
  ]);

  const contentKeywords = [
    ...skillsKeywords,
    userName,
    `${userName} developer`,
    `${userName} programmer`,
    'portfolio',
    'professional',
    'developer',
    'programmer',
    'software engineer',
    'technical skills',
    majorName,
    'Paragon International University',
    'ParagonU',
    'Paragon University',
    'TalentHub',
    'student portfolio',
    'developer portfolio',
    'programming portfolio',
    'tech portfolio',
    'academic profile',
    'university portfolio',
    'contact',
    'hire developer',
    'freelance developer',
    'resume',
    'profile',
    'Cambodia university',
    'international university',
    'Cambodia developer',
    'Southeast Asia developer',
    ...experiences.slice(0, 5),
    ...education.slice(0, 3),
    ...projects.slice(0, 5)
  ].filter(Boolean);

  return {
    title,
    description: enhancedDescription,
    keywords: contentKeywords.join(', '),
    authors: [{ name: userName }],
    creator: userName,
    publisher: 'Paragon International University - TalentHub',

    openGraph: {
      type: 'profile',
      title,
      description: enhancedDescription,
      url,
      images: photo ? [
        {
          url: photo,
          width: 400,
          height: 400,
          alt: `${userName} - ${skills.slice(0, 3).join(', ')} Developer at Paragon International University`,
        }
      ] : [],
      siteName: 'Paragon International University TalentHub',
      locale: 'en_US',
      // profile: {
      //   firstName: userName.split(' ')[0],
      //   lastName: userName.split(' ').slice(1).join(' '),
      //   username: googleId,
      // }
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description: enhancedDescription,
      images: photo ? [photo] : [],
      creator: `@${userName.replace(/\s+/g, '').toLowerCase()}`,
      site: '@ParagonUniversity',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    alternates: {
      canonical: url,
    },

    applicationName: 'TalentHub - Paragon International University',
    themeColor: '#2B5797',
    // category: skills.length > 0 ? `${skills[0]} Development` : majorName,
    classification: 'Student Portfolio',
  };
}

function generateStructuredData(portfolio: Portfolio, googleId: string) {
  // Extract skills with enhanced detail
  const skills = portfolio.skills?.map(skill => skill.title).filter(Boolean) || [];

  // Extract work experiences
  const workExperiences = portfolio.experiences?.map(exp => ({
    '@type': 'WorkExperience',
    jobTitle: exp.work_title,
    description: exp.description,
    startDate: `${exp.start_year}-${exp.start_month?.padStart(2, '0') || '01'}`,
    endDate: exp.end_year ? `${exp.end_year}-${exp.end_month?.padStart(2, '0') || '12'}` : undefined,
    employer: {
      '@type': 'Organization',
      name: exp.company_name || 'Company'
    }
  })).filter(exp => exp.jobTitle) || [];

  // Extract education
  const educationHistory = portfolio.education?.map(edu => ({
    '@type': 'EducationalOccupationalCredential',
    name: edu.field_of_study || 'Degree',
    recognizedBy: {
      '@type': 'EducationalOrganization',
      name: edu.education_center || 'Educational Institution'
    },
  })).filter(edu => edu.recognizedBy.name && edu.recognizedBy.name !== 'Educational Institution') || [];

  // Extract projects as CreativeWork
  const creativeWorks = portfolio.projects?.map(project => ({
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: project.link || undefined,
    creator: {
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`
    }
  })).filter(project => project.name) || [];

  // Enhanced job title with skills
  const jobTitle = skills.length > 0 ?
    `${skills.slice(0, 3).join(', ')} Developer` :
    (portfolio.portfolio.role_id === 1 ? portfolio.portfolio.major || 'Student' : 'Endorser');

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`,
        name: portfolio.portfolio.user_name,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`,
        image: portfolio.portfolio.photo,
        description: portfolio.portfolio.about || `Professional ${skills.length > 0 ? skills.slice(0, 3).join(', ') + ' developer' : 'portfolio'} of ${portfolio.portfolio.user_name} from Paragon International University`,
        email: portfolio.portfolio.email,
        telephone: portfolio.portfolio.phone_number,
        jobTitle: jobTitle,
        knowsAbout: skills.length > 0 ? skills : undefined,
        hasOccupation: workExperiences.length > 0 ? workExperiences : undefined,
        hasCredential: educationHistory.length > 0 ? educationHistory : undefined,
        // Add skills as additional properties
        additionalProperty: skills.map(skill => ({
          '@type': 'PropertyValue',
          name: 'skill',
          value: skill
        })),
        alumniOf: {
          '@type': 'University',
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#university`,
          name: 'Paragon International University',
          alternateName: ['ParagonU', 'Paragon University'],
          url: process.env.NEXT_PUBLIC_SITE_URL,
          sameAs: [
            'https://www.paragoniu.edu.kh',
            'https://www.facebook.com/ParagonInternationalUniversity',
            'https://www.linkedin.com/school/paragon-international-university'
          ]
        },
        worksFor: {
          '@type': 'Organization',
          name: 'Paragon International University - TalentHub',
          parentOrganization: {
            '@type': 'University',
            name: 'Paragon International University'
          }
        },
        sameAs: [
          `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`,
        ],
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`,
        },
      },
      ...creativeWorks,
      {
        '@type': 'WebPage',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`,
        name: `${portfolio.portfolio.user_name} - ${jobTitle} | Paragon International University`,
        description: portfolio.portfolio.about || `Professional ${skills.length > 0 ? skills.slice(0, 3).join(', ') + ' developer' : 'portfolio'} of ${portfolio.portfolio.user_name} from Paragon International University`,
        keywords: [
          ...skills.flatMap(skill => [skill, `${skill} developer`, `${skill} programmer`]),
          portfolio.portfolio.user_name,
          'developer',
          'programmer',
          'Paragon International University',
          'ParagonU',
          'portfolio',
          'Cambodia developer'
        ].join(', '),
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#website`,
          name: 'Paragon International University TalentHub',
          url: process.env.NEXT_PUBLIC_SITE_URL,
          publisher: {
            '@type': 'University',
            name: 'Paragon International University',
            alternateName: ['ParagonU', 'Paragon University']
          }
        },
        mainEntity: {
          '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: process.env.NEXT_PUBLIC_SITE_URL
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Portfolio',
              item: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: portfolio.portfolio.user_name,
              item: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`
            }
          ]
        }
      },
      {
        '@type': 'University',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL}#university`,
        name: 'Paragon International University',
        alternateName: ['ParagonU', 'Paragon University'],
        url: process.env.NEXT_PUBLIC_SITE_URL,
        description: 'Leading international university providing quality education and fostering student talent through innovative programs and platforms like TalentHub.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'KH',
          addressLocality: 'Phnom Penh',
          addressRegion: 'Phnom Penh'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'admissions',
          telephone: '+855-23-881-902',
          email: 'info@paragoniu.edu.kh'
        }
      }
    ]
  };

  return structuredData;
}

async function PortfolioContent({ googleId }: { googleId: string }) {
  const portfolioData = await fetchPortfolioData(googleId);

  if (!portfolioData) {
    notFound();
  }

  const structuredData = generateStructuredData(portfolioData, googleId);
  const skills = portfolioData.skills?.map(skill => skill.title).filter(Boolean) || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main role="main">
        <nav aria-label="breadcrumb">
          <ol className="sr-only">
            <li><a href={process.env.NEXT_PUBLIC_SITE_URL}>Paragon International University</a></li>
            <li><a href={`${process.env.NEXT_PUBLIC_SITE_URL}/portfolio`}>Portfolio</a></li>
            <li aria-current="page">{portfolioData.portfolio.user_name}</li>
          </ol>
        </nav>

        <article
          itemScope
          itemType="https://schema.org/Person"
          itemID={`${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`}
        >
          {/* Enhanced SEO content with skills prioritized */}
          <div className="sr-only">
            <h1 itemProp="name">
              {skills.length > 0 ?
                `${skills.slice(0, 3).join(', ')} Developer - ${portfolioData.portfolio.user_name} | Paragon International University` :
                `${portfolioData.portfolio.user_name} - Paragon International University`
              }
            </h1>
            <p itemProp="description">{portfolioData.portfolio.about}</p>
            <span itemProp="email">{portfolioData.portfolio.email}</span>
            <span itemProp="telephone">{portfolioData.portfolio.phone_number}</span>
            <span itemProp="jobTitle">
              {skills.length > 0 ?
                `${skills.slice(0, 3).join(', ')} Developer` :
                (portfolioData.portfolio.role_id === 1 ?
                  portfolioData.portfolio.major || 'Student' : 'Endorser')
              }
            </span>

            {/* Enhanced Skills Section with more SEO content */}
            {portfolioData.skills && portfolioData.skills.length > 0 && (
              <div>
                <h2>Professional Skills and Expertise</h2>
                <p>
                  {portfolioData.portfolio.user_name} is a skilled developer specializing in {skills.join(', ')}
                  at Paragon International University. Available for freelance projects and full-time opportunities.
                </p>
                {portfolioData.skills.map((skill, index) => (
                  <div key={index}>
                    <h3 itemProp="knowsAbout">{skill.title} Developer</h3>
                    <p>
                      Expert in {skill.title} programming and development.
                      {skill.description && <span> {skill.description}</span>}
                      Available for {skill.title} projects in Cambodia and internationally.
                    </p>
                    {/* Generate additional SEO content for each skill */}
                    <div style={{ display: 'none' }}>
                      <span>{skill.title} programmer</span>
                      <span>{skill.title} specialist</span>
                      <span>{skill.title} expert</span>
                      <span>{skill.title} consultant</span>
                      <span>{skill.title} freelancer</span>
                      <span>{skill.title} developer Paragon International University</span>
                      <span>{skill.title} developer Cambodia</span>
                      <span>Hire {skill.title} developer</span>
                      <span>{skill.title} development services</span>
                      <span>{portfolioData.portfolio.user_name} {skill.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Experience Section */}
            {portfolioData.experiences && portfolioData.experiences.length > 0 && (
              <div>
                <h2>Professional Work Experience</h2>
                {portfolioData.experiences.map((exp, index) => (
                  <div key={index} itemProp="hasOccupation" itemScope itemType="https://schema.org/WorkExperience">
                    <h3 itemProp="jobTitle">{exp.work_title}</h3>
                    <span itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                      <span itemProp="name">{exp.company_name}</span>
                    </span>
                    <p itemProp="description">{exp.description}</p>
                    <span itemProp="employmentType">{exp.employment_type}</span>
                    <time itemProp="startDate">{exp.start_year}-{exp.start_month?.padStart(2, '0') || '01'}</time>
                    {exp.end_year && (
                      <time itemProp="endDate">{exp.end_year}-{exp.end_month?.padStart(2, '0') || '12'}</time>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {portfolioData.education && portfolioData.education.length > 0 && (
              <div>
                <h2>Educational Background</h2>
                {portfolioData.education.map((edu, index) => (
                  <div key={index} itemProp="hasCredential" itemScope itemType="https://schema.org/EducationalOccupationalCredential">
                    <h3 itemProp="name">{edu.field_of_study}</h3>
                    <span itemProp="recognizedBy" itemScope itemType="https://schema.org/EducationalOrganization">
                      <span itemProp="name">{edu.education_center}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Projects Section */}
            {portfolioData.projects && portfolioData.projects.length > 0 && (
              <div>
                <h2>Projects and Portfolio Work</h2>
                {portfolioData.projects.map((project, index) => (
                  <div key={index} itemScope itemType="https://schema.org/CreativeWork">
                    <h3 itemProp="name">{project.title}</h3>
                    <p itemProp="description">{project.description}</p>
                    {project.link && (
                      <link itemProp="url" href={project.link} />
                    )}
                    <span itemProp="creator" itemRef={`${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`}>
                      {portfolioData.portfolio.user_name}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements Section */}
            {portfolioData.achievements && portfolioData.achievements.length > 0 && (
              <div>
                <h2>Professional Achievements</h2>
                {portfolioData.achievements.map((achievement, index) => (
                  <div key={index} itemScope itemType="https://schema.org/Achievement">
                    <h3 itemProp="name">{achievement.title}</h3>
                    <p itemProp="description">{achievement.description}</p>
                    <span itemProp="issuedBy">{achievement.issued_by}</span>
                    <time itemProp="dateCreated">{achievement.issue_year}-{achievement.issue_month?.padStart(2, '0') || '01'}</time>
                    {achievement.image && (
                      <img itemProp="image" src={achievement.image} alt={`${achievement.title} certificate`} style={{ display: 'none' }} />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div itemProp="alumniOf" itemScope itemType="https://schema.org/University">
              <span itemProp="name">Paragon International University</span>
              <span itemProp="alternateName">ParagonU</span>
              <span itemProp="alternateName">Paragon University</span>
              <link itemProp="url" href={process.env.NEXT_PUBLIC_SITE_URL} />
            </div>
            <link itemProp="url" href={`${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${googleId}`} />
            {portfolioData.portfolio.photo && (
              <img
                itemProp="image"
                src={portfolioData.portfolio.photo}
                alt={`${portfolioData.portfolio.user_name} - ${skills.length > 0 ? skills.slice(0, 3).join(', ') + ' Developer' : 'Professional'} at Paragon International University`}
                style={{ display: 'none' }}
              />
            )}

            {/* Additional university context */}
            <div itemScope itemType="https://schema.org/University">
              <h2 itemProp="name">Paragon International University</h2>
              <span itemProp="alternateName">ParagonU</span>
              <span itemProp="alternateName">Paragon University</span>
              <p itemProp="description">
                Leading international university in Cambodia providing quality education and fostering student talent through innovative programs and platforms like TalentHub.
                Home to skilled developers in various technologies including {skills.join(', ')}.
              </p>
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="addressCountry">Cambodia</span>
                <span itemProp="addressLocality">Phnom Penh</span>
              </div>
            </div>

            {/* Additional SEO content for discoverability */}
            <div style={{ display: 'none' }}>
              <h2>Hire {portfolioData.portfolio.user_name}</h2>
              <p>
                Looking for a skilled {skills.length > 0 ? skills.slice(0, 3).join(', ') : ''} developer?
                {portfolioData.portfolio.user_name} from Paragon International University is available for:
              </p>
              <ul>
                <li>Freelance development projects</li>
                <li>Full-time developer positions</li>
                <li>Consulting and technical advisory</li>
                <li>Remote work opportunities</li>
                <li>Project-based collaboration</li>
              </ul>
              <p>
                Contact {portfolioData.portfolio.user_name} at {portfolioData.portfolio.email} or
                {portfolioData.portfolio.phone_number} for professional {skills.length > 0 ? skills.slice(0, 3).join(', ') : ''} development services.
              </p>
            </div>
          </div>

          <PortfolioPageComponent portfolio={portfolioData} />
        </article>
      </main>
    </>
  );
}

export default async function PortfolioPage({
  params
}: {
  params: Promise<{ googleId: string }>
}) {
  const { googleId } = await params;

  return (
    <Suspense fallback={<LoadingScreen message="Loading developer portfolio from Paragon International University..." />}>
      <PortfolioContent googleId={googleId} />
    </Suspense>
  );
}
