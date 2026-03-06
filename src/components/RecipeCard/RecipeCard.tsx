import React, { memo } from 'react';
import Text from 'components/Text'
import styles from './RecipeCard.module.scss'
import classNames from 'classnames';

export type CardProps = {
    className?: string,
    image: string;
    captionSlot?: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    contentSlot?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    actionSlot?: React.ReactNode;
};

const RecipeCard: React.FC<CardProps> = (props) => {
    return (
        <article onClick={props.onClick} className={classNames(styles.card, props.className)}>
            <img className={styles.img} src={props.image} alt="Изображение" />
            <div className={styles.cardDescr}>

                <div className={styles.textBox}>
                    {
                        props.captionSlot &&
                        <div className={styles.captionSlot}>{props.captionSlot}</div>
                    }

                    <Text className={styles.title} view='p-20' maxLines={1}>{props.title}</Text>
                    <Text className={styles.subtitle} view='p-16' color='secondary' maxLines={2}>{props.subtitle}</Text>
                </div>

                {
                    <div className={styles.bottomContainer}>
                        {props.contentSlot}
                        {props.actionSlot}
                    </div>
                }

            </div>
        </article>)
};

export default memo(RecipeCard);