import { SyntheticEvent } from "react";

interface Props {
    filters: string[],
    topic: string, 
    toggleFilterActive: Function
}
function FilterOptions({ filters, topic, toggleFilterActive }: Props) {
    const filterList = filters.map((filter: string, index: number) => {
        if (index === 0)
            return <option className={`scrollListFilter ${topic}-option isActive`} id={`${topic}-option-${index}`} key={`${topic}-option-${index}`}
                onClick={(event) => {
                    toggleFilterActive(event, `${topic}-option-${index}`,topic);
                }} aria-label={`filter ${topic} by ${filter}`}>{filter}</option>
        else
            return <option className={`scrollListFilter ${topic}-option`} id={`${topic}-option-${index}`} key={`${topic}-option-${index}`}
                onClick={(event) => {
                    toggleFilterActive(event, `${topic}-option-${index}`,topic);
                }} aria-label={`filter ${topic} by ${filter}`}>{filter}</option>
    })
    return (
        <>
            {filterList}
        </>
    )
}
export default FilterOptions;