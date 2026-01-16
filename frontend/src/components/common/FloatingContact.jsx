import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaLinkedinIn, 
  FaInstagram, 
  FaTwitter, 
  FaFacebookF, 
  FaYoutube, 
  FaTiktok, 
  FaTelegram, 
  FaWhatsapp,
  FaMessage
} from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/contact-info`);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setContact(data[0]);
                }
            } catch (error) {
                console.error("Failed to fetch contact info for floating button", error);
            }
        };
        fetchContact();
    }, []);

    const socialIcons = {
        'Facebook': <FaFacebookF />,
        'Instagram': <FaInstagram />,
        'LinkedIn': <FaLinkedinIn />,
        'Twitter': <FaTwitter />,
        'YouTube': <FaYoutube />,
        'TikTok': <FaTiktok />,
        'Telegram': <FaTelegram />,
        'WhatsApp': <FaWhatsapp />
    };

    const displayedSocials = contact?.socials?.length > 0 ? contact.socials : [
        { platform: 'LinkedIn', url: '#' },
        { platform: 'Instagram', url: '#' },
        { platform: 'Twitter', url: '#' },
        { platform: 'Facebook', url: '#' }
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[9999]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                        className="mb-4 flex flex-col items-end gap-3"
                    >
                        {displayedSocials.map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group flex flex-row-reverse items-center gap-3 bg-white dark:bg-gray-800 p-2 pl-4 rounded-full shadow-lg border border-gray-100 dark:border-white/10 hover:border-red-500/50 hover:shadow-red-500/10 transition-all duration-300"
                            >
                                <div className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full group-hover:scale-110 transition-transform duration-300 shadow-md">
                                    {socialIcons[social.platform] || <FaFacebookF />}
                                </div>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-red-500 transition-colors">
                                    {social.platform}
                                </span>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300 relative ${
                    isOpen 
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900" 
                    : "bg-red-600 text-white"
                }`}
            >
                {isOpen ? <IoClose size={32} /> : <FaMessage size={28} />}
                
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                )}
            </motion.button>
        </div>
    );
};

export default FloatingContact;
