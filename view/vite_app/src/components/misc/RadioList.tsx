import styles from '../../assets/css/misc/radioInput.module.css'

interface RadioListProps {
    selected: number,
    items: string[],
    colors?: string[],
    itemHeight: number,
    bubbleDiameter: string,
    bubbleColor?: string,
    backgroundColor?: string,
    callback: (selected: number) => void
}

// itemHeight is a number (out of 100) which represents the percentage of the entire RadioList's height that each item should take up
export default function RadioList({ selected, items, colors, itemHeight, bubbleDiameter, bubbleColor, backgroundColor, callback } : RadioListProps) {

    return (
        <div className={styles.container}>
            {
                items.map((item, index) => {
                    return (
                        <div onClick={() => { callback(index) }} className={styles.itemContainer} style={{maxHeight: `${itemHeight}%`}}>
                            <div className={styles.bubble} style={{width: bubbleDiameter, height: bubbleDiameter, backgroundColor: (backgroundColor ? backgroundColor : 'whitesmoke')}}>
                                {
                                    selected === index ?
                                    <div style={{backgroundColor: (bubbleColor ? bubbleColor : '#2a54c7')}}></div> :
                                    <></>
                                }
                            </div>
                            <p className={styles.itemText} style={(colors ? { color: colors[index] } : {})}>{item}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}