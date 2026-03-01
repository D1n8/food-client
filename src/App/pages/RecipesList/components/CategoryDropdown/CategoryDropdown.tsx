import { useEffect, useMemo, useState } from "react";
import CategoryStore from "store/CategoryStore";
import styles from './CategoryDropdown.module.scss'
import MultiDropdown from "components/MultiDropdown";
import { useSearchParams } from "react-router";
import type { Option } from 'components/MultiDropdown/types/types'
import { formatSeletedCategories } from "utils/utils";
import { observer } from "mobx-react-lite";

const CategoryDropdown = observer(() => {
    const [store] = useState(() => new CategoryStore())
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        store.fetchCategoryList()
    }, [store])

    const categoryOptions = useMemo<Option[]>(
        () => store.list.map(item => ({ key: item.id.toString(), value: item.title })),
        [store.list])

    const selectedValues = useMemo(() => {
        const param = searchParams.get('categories')
        const ids = param ? param.split(',') : []

        return categoryOptions.filter(opt => ids.includes(opt.key))
    }, [searchParams, categoryOptions])

    const handleChange = (newValues: Option[]) => {
        const newParams = new URLSearchParams(searchParams)
        
        if (newValues.length === 0) {
            newParams.delete('categories')
        } else {
            const ids = newValues.map(v => v.key).join(',')
            newParams.set('categories', ids)
        }
        
        setSearchParams(newParams)
    }

    const handleGetTitle = (value: Option[]) => {
       return formatSeletedCategories(value)
    }

    return (
        <>
            <MultiDropdown
                className={styles.multiDropdown}
                options={categoryOptions}
                value={selectedValues}
                onChange={handleChange}
                getTitle={handleGetTitle}
                placeholder="Categories" />
        </>
    );
})

export default CategoryDropdown;