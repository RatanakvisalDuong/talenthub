export default function CustomButton({
    onClick,
    label,
    color,
    textColor,
}: {
    label: string;
    onClick: () => void;
    color?: string;
    textColor?: string;
}) {
    return (
        <button
            type="submit"
            className={`text-${textColor} bg-${color} px-4 py-2 rounded-xl hover:bg-green-600 cursor-pointer`}
            onClick={onClick}
        >
            {label}
        </button>
    );
}