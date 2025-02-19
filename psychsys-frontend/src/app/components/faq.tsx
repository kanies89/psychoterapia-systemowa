"use client";
import React, { useEffect, useState } from "react";
import Accordion from "@/app/components/motion_accordion";
import {useAuth} from "@/app/components/logged_in";

interface FAQItem {
    id: number;
    title: string;
    content: string;
}


const Faq: React.FC = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth(); // Access the context values
    const [faqList, setFaqList] = useState<FAQItem[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const url_backend = process.env.NEXT_PUBLIC_API_URL;

    // Fetch FAQ data from the Django backend
    useEffect(() => {
        fetch(`${url_backend}/faqs/`)  // Update to your Django backend URL
            .then((response) => response.json())
            .then((data) => setFaqList(data))
            .catch((error) => console.error("Error fetching FAQs:", error));
    }, []);

    // Function to add a new FAQ
    const addFaq = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Title and content cannot be empty.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);

        const response = await fetch(`${url_backend}/faqs/add/`, {
            method: "POST",
            credentials: "include", // Include cookies for authentication
            body: formData,
        });

        const data = await response.json();
        if (data.status === "success") {
            setFaqList([...faqList, { id: Date.now(), title, content }]);
            setTitle("");
            setContent("");
        } else {
            console.error("Error adding FAQ:", data.message);
        }
    };

    return (
        <div>
            {isLoggedIn && (
                <Accordion title="Add new FAQ">
                    <div className="mt-4 p-4 border rounded">
                        <input
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border bg-bg_2 p-2 w-full mb-2 focus:bg-cyan-900 focus:text-white placeholder-gray-300 rounded-lg"
                        />
                        <textarea
                            placeholder="Enter content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="border bg-bg_2 p-2 w-full mb-2 focus:bg-cyan-900 focus:text-white  placeholder-gray-300 rounded-lg"
                        />
                        <button
                            onClick={addFaq}
                            className="bg-c1 text-white hover:bg-cyan-900 active:bg-bg_1 active:text-black p-2 rounded-lg"
                        >
                            Add FAQ
                        </button>
                    </div>
                </Accordion>
            )}
            {faqList.map((faq) => (
                <Accordion key={faq.id} title={faq.title}>
                    <p>{faq.content}</p>
                </Accordion>
            ))}
        </div>
    );
};

export default Faq;
