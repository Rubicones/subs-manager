import styles from "./sideMenu.module.sass";
import Tile from "../tile/tile";
import { useState, useEffect, useRef } from "react";

function SideMenu({ createNewTile, hideMenu }) {
    const datePicker = useRef(new Date());
    const title = useRef(null);
    const cost = useRef(null);
    const link = useRef(null);

    const interval = { n: 1, interval: "week" }; // month, week, day

    const submitTileAdd = () => {
        createNewTile(
            title.current.value,
            new Date(datePicker.current.value).getTime(),
            cost.current.value,
            link.current.value,
            interval
        );
        hideMenu()
    };

    return (
        <aside className={styles["side-menu"]}>
            <div className={styles.cross} onClick={hideMenu}></div>
            <div className={styles["options-container"]}>
                <div className={styles.hiddenPart}>
                    <div className={styles.label}>
                        Pick date of the last payment *
                    </div>
                    <input
                        type="date"
                        className={styles.datepicker}
                        ref={datePicker}
                    />
                    <div className={styles.label}>Title *</div>
                    <input
                        type="text"
                        className={styles["name-setter"]}
                        ref={title}
                    />
                    <div className={styles.label}>Cost in USD *</div>
                    <input
                        type="number"
                        className={styles["name-setter"]}
                        ref={cost}
                    />
                    <div className={styles.label}>Link</div>
                    <input
                        type="text"
                        className={styles["name-setter"]}
                        ref={link}
                    />
                    <button
                        className={styles["add-submit-btn"]}
                        onClick={submitTileAdd}
                    >
                        Add sub
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default SideMenu;
