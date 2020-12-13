import { reactive, ref } from '@vue/composition-api'
 
export function pageInationHook(){
    const pageData = reactive({
        currentPage: 1,
        pageSize: 10,
        total: 100,
        pageSizes: [5, 10, 20, 50, 100]
    })
    // 统计数据总和
    const totalCount = (val) => {
        pageData.total = val
    } 

    const handleSizeChange = (val) =>{
        pageData.pageSize = val
    }

    const handleCurrentChange = (val) =>{
        pageData.currentPage = val
    }
    return {
        pageData,
        totalCount,
        handleSizeChange,
        handleCurrentChange
    }
}