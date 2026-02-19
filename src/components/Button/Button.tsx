import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
    className,
    loading,
    children,
    disabled,
    ...props
}) => {
    return (
        <button
            className={classNames(className, styles.btn)}
            disabled={disabled || loading}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;