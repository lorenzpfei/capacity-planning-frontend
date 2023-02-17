import React from "react";

export function MicrosoftButton(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            enableBackground="new 0 0 512 512"
            version="1.1"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            style={{height: 16}}
        >
            <path
                fill="#4CAF50"
                d="M272 240h240V16c0-8.832-7.168-16-16-16H272v240z"
            ></path>
            <path
                fill="#F44336"
                d="M240 240V0H16C7.168 0 0 7.168 0 16v224h240z"
            ></path>
            <path
                fill="#2196F3"
                d="M240 272H0v224c0 8.832 7.168 16 16 16h224V272z"
            ></path>
            <path
                fill="#FFC107"
                d="M272 272v240h224c8.832 0 16-7.168 16-16V272H272z"
            ></path>
        </svg>
    );
}