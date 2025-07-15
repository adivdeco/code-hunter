import { motion } from "framer-motion";

export const MotionDiv = ({
    children,
    initial = { opacity: 0 },
    animate = { opacity: 1 },
    transition = { duration: 0.3 },
    className,
    ...props
}) => {
    return (
        <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};