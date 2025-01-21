

import { useState } from "react";
import UserManualDialog from "./UserManualDialog";
import { AboutDialog } from "./AboutDialog";

const Footer: React.FC = () => {
    const [isManualOpen, setIsManualOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    return (
        <footer className="bg-white">
            <div className="mx-4 md:mx-16 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="https://www.uniatlantico.edu.co/wp-content/uploads/2023/01/Universidad-del-Atlántico-e1672809639550-300x127.png" className="h-12" alt="Flowbite Logo" />
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsManualOpen(true);
                                }}>
                                ¿Cómo usar?
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:underline me-4 md:me-6"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsAboutOpen(true);
                                }}>
                                Acerca de
                            </a>
                        </li>
                        <li>
                            <a href="mailto:antonydominguez28@gmail.com" className="hover:underline">Contacto</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 text-center">© 2025 <a href="https://antonyjdc.vercel.app/" className="hover:underline">AntonyJDC</a>. All Rights Reserved.</span>
            </div>

            <UserManualDialog
                isOpen={isManualOpen}
                onClose={() => setIsManualOpen(false)}
            />
            <AboutDialog
                isOpen={isAboutOpen}
                onClose={() => setIsAboutOpen(false)}
            />
        </footer>
    )
}

export default Footer;

