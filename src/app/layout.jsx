import "./globals.css";
import StarryBackground from "@/components/(layout)/StarryBackground";

export const metadata = {
    title: "Synapse'25",
    description: "Official website of Synapse'25,DA ka Tyohaar",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                {children}
                <StarryBackground />
            </body>
        </html>
    );
}