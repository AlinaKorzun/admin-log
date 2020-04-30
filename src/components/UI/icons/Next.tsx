import React from 'react';

interface Props {
    color?: string;
    height?: number;
    size?: number;
    width?: number;
    onClick?: any;
    style?: any;
}

export default (props: Props) => {
    const { color, height, width, onClick, size, style } = props;
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            onClick={onClick}
            fill={color}
            width={width || size}
            style={style}
            viewBox='0 0 17.6 16'
        >
            <g id='Component_24' transform='translate(-7 -7) rotate(360)'>
                <path
                    id='Path_2116'
                    d='M7.36,17.5h11.78l-3.7,4.06c-0.38,0.43-0.38,1.07,0,1.5l0.58,0.63c0.33,0.38,0.9,0.41,1.28,0.08
		c0.03-0.03,0.06-0.05,0.08-0.08l6.35-6.95c0.37-0.43,0.37-1.07,0-1.49l-6.35-6.95c-0.33-0.38-0.9-0.41-1.28-0.08
		c-0.03,0.02-0.05,0.05-0.08,0.08l-0.58,0.63c-0.18,0.2-0.28,0.47-0.28,0.74c0,0.27,0.1,0.53,0.28,0.73l3.74,4.08H7.37
		c-0.56,0.04-0.99,0.52-0.98,1.08v0.89c-0.01,0.56,0.43,1.02,0.99,1.04'
                    fill='currentColor'
                />
            </g>
        </svg>
    );
};
