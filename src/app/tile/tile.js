/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./tile.module.sass";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

function getDaysInCurrentMonth() {
    const date = new Date();

    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

const Circle = (props) => {
    const [strokeOffset, setStrokeOffset] = useState(0);
    const [strokeDasharray, setStrokeDasharray] = useState(0);
    const [angle, setAngle] = useState(props.angle);
    const circle = useRef(0);

    const targetAngle = props.angle;
    const CIRCUMFERENCE = 2 * Math.PI * 72;

    useEffect(() => {
        if (targetAngle > 180) circle.current.style.stroke = "green";
        else if (targetAngle > 90) circle.current.style.stroke = "#f7cf3b";
        else circle.current.style.stroke = "red";
        setAngle(props.angle);
    }, [props]);

    useEffect(() => {
        setStrokeOffset((1 / 4) * CIRCUMFERENCE);
        setStrokeDasharray((angle / 360) * CIRCUMFERENCE);
    }, [angle]);

    useEffect(() => {
        circle.current.style.strokeDasharray = `${strokeDasharray} ${
            CIRCUMFERENCE - strokeDasharray
        }`;
        circle.current.style.strokeDashoffset = `${strokeOffset}`;
    }, [strokeDasharray, strokeOffset]);

    return (
        <svg className={styles["svg-cont"]}>
            <circle
                ref={circle}
                className={styles["inner-circle"]}
                strokeWidth="8"
                fill="transparent"
                r="72"
                cx="90"
                cy="90"
            />
        </svg>
    );
};

function Tile({
    title,
    date,
    cost,
    link,
    id,
    interval
}) {
    library.add(faPencil);
    const daysLeftLabel = useRef(0);
    const tile = useRef(0);
    const [daysLeft, setDaysLeft] = useState(-2);
    const [angle, setAngle] = useState(0);

    const ONE_DAY = 24 * 60 * 60 * 1000;

    useEffect(() => {
        console.log(daysLeft)
        switch (interval.interval) {
            case "month":
                setAngle(
                    (daysLeft * 360) / (getDaysInCurrentMonth() * interval.n)
                );
                break;
            case "week":
                setAngle((daysLeft * 360) / (7 * interval.n));
                break;
            case "day":
                setAngle((daysLeft * 360) / interval.n);
                break;
        }
    }, [daysLeft]);

    useEffect(() => {
        let today = new Date();
        let payday = new Date(date);
        if (daysLeft === -2) {
            switch (interval.interval) {
                case "month":
                    payday.setMonth(payday.getMonth() + interval.n);
                    setDaysLeft(Math.round((payday - today) / ONE_DAY));
                    break;
                case "week":
                    payday.setTime(payday.getTime() + ONE_DAY * 7 * interval.n);
                    setDaysLeft(Math.round((payday - today) / ONE_DAY));
                    break;
                case "day":
                    payday.setTime(payday.getTime() + ONE_DAY * interval.n);
                    setDaysLeft(Math.round((payday - today) / ONE_DAY));
                    break;
            }
        }
    }, []);

    return (
        <>
            <div className={styles.tileDropShadow}>
                <div className={styles.tile} data-id={id}>
                    <div className={styles["tile-inner"]} ref={tile}>
                        <div className={styles["tile-front"]}>
                            <Circle angle={angle} />
                            <span
                                className={styles["days-left"]}
                                ref={daysLeftLabel}
                            >
                                {daysLeft}
                            </span>
                            <span className={styles.name}>{title}</span>
                        </div>
                        <div className={styles["tile-back"]}>
                            <div className={styles["trash-btn"]}>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    size="2xs"
                                    onClick={() => {
                                        deleteTile(id);
                                    }}
                                />
                            </div>

                            <div className={styles["edit-btn"]}>
                                <FontAwesomeIcon
                                    icon={faPencil}
                                    size="2xs"
                                    onClick={() => {
                                        openMenu(id);
                                    }}
                                />
                            </div>
                            <span className={styles["cost-header"]}>Cost</span>
                            <span className={styles.cost}>{cost}$</span>
                            <span className={styles["date-header"]}>
                                Next payment
                            </span>
                            <span className={styles.date}>
                                
                            </span>
                            <span className={styles["date-header"]}>Link</span>
                            <span className={styles.date}>
                                <a href={link} className={styles.link}>
                                    {link}
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Tile;
