import React, { useState } from 'react';

const Select: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option: string) => {
        setIsOpen(false);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.currentTarget.style.backgroundColor = '#4A5568';
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.currentTarget.style.backgroundColor = '#40515F';
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
                onClick={toggleDropdown}
                style={{
                    background: '#40515F',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40px', // Mantén el ancho del botón pequeño
                }}
            >
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" style={{ color: 'white' }}>
                    <path d="M7 10l5 5 5-5H7z" />
                </svg>
            </div>
            {isOpen && (
                <ul
                    style={{
                        background: '#40515F',
                        color: 'white',
                        padding: '0',
                        margin: '0',
                        borderRadius: '4px',
                        position: 'absolute',
                        width: '300px', // Aumenta el ancho del dropdown
                        zIndex: '1',
                        listStyleType: 'none',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        marginTop: '4px',
                        left: 'calc(100% - 300px)', // Alinea el dropdown a la derecha del botón
                    }}
                >
                    {['Conciertos', 'Deportes', 'Teatro y arte', 'Familiar', 'Otros'].map((option) => (
                        <li
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            style={{
                                padding: '8px 20px',
                                cursor: 'pointer',
                                borderBottom: 'transparent',
                                textAlign: 'right', // Alinea el texto a la derecha
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;
