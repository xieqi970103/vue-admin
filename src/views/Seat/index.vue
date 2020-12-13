<template>
    <div> 
        <el-table 
        :data="data.seat"  
        >
          <el-table-column label="sx11" prop="sx11" >
              <template slot-scope="{row: {sx11}}">
                <span v-if="+sx11 === 0"><img  src="@/assets/images/seat_free.png" alt=""></span>
                <span v-else-if="+sx11 === 1">
                    <img  src="@/assets/images/seat_use.png" alt="">
                </span> 
                <span v-else>
                    <img  src="@/assets/images/desk.png" alt="">
                </span>
              </template>
          </el-table-column>
          <el-table-column label="sx12" prop="sx12" >
            <template  slot-scope="{row: {sx12}}">
                <span v-if="+sx12 === 0"><img  src="@/assets/images/seat_free.png" alt=""></span>
                <span v-else-if="+sx12 === 1">
                    <img   src="@/assets/images/seat_use.png" alt="">
                </span> 
                <span v-else >
                    <img src="@/assets/images/desk.png" alt="">
                </span>
              </template>
          </el-table-column>
          <el-table-column label="sx13" prop="sx13">
              
            <template slot-scope="{row: {sx13}}">
                <span v-if="+sx13 === 0"><img  src="@/assets/images/seat_free.png" alt=""></span>
                <span v-else-if="+sx13 === 1">
                    <img    src="@/assets/images/seat_use.png" alt="">
                </span> 
                <span v-else>
                    <img  src="@/assets/images/desk.png" alt="">
                </span>
            </template>
          </el-table-column>
          <el-table-column label="sx14" prop="sx14">
            <template slot-scope="{row: {sx14}}">
                <span v-if="+sx14 === 0"><img  src="@/assets/images/seat_free.png" alt=""></span>
                <span v-else-if="+sx14 === 1">
                    <img  src="@/assets/images/seat_use.png" alt="">
                </span> 
                <span v-else>
                    <img  src="@/assets/images/desk.png" alt="">
                </span>
              </template>
          </el-table-column>
          <el-table-column label="过道" width="300" > 
          </el-table-column>
          <el-table-column label="nx11" prop="nx11">
            <template slot-scope="{row: {nx11}}">
                <span v-if="+nx11 === 0"><img  src="@/assets/images/seat_free.png" alt=""></span>
                <span v-else-if="+nx11 === 1">
                    <img  src="@/assets/images/seat_use.png" alt="">
                </span> 
                <span v-else>
                    <img  src="@/assets/images/desk.png" alt="">
                </span>
              </template>
          </el-table-column>
          <el-table-column label="nx12" prop="nx12">
            <template slot-scope="{row: {nx12}}">
                <span v-if="+nx12 === 0"><img  src="@/assets/images/seat_free.png" alt=""></span>
                <span v-else-if="+nx12 === 1">
                    <img  src="@/assets/images/seat_use.png" alt="">
                </span> 
                <span v-else>
                    <img  src="@/assets/images/desk.png" alt="">
                </span>
              </template>
          </el-table-column>
          <el-table-column label="nx13" prop="nx13">
            <template slot-scope="{row: {nx13}}">
                <span v-if="+nx13 === 0"><img  src="@/assets/images/seat_free.png" alt=""></span>
                <span v-else-if="+nx13 === 1">
                    <img  src="@/assets/images/seat_use.png" alt="">
                </span> 
                <span v-else>
                    <img  src="@/assets/images/desk.png" alt="">
                </span>
              </template>
          </el-table-column>
          <el-table-column label="nx14" prop="nx14">
            <template slot-scope="{row: {nx14}}">
                <span v-if="+nx14 === 0"><img  src="@/assets/images/seat_free.png" alt=""></span>
                <span v-else-if="+nx14 === 1">
                    <img  src="@/assets/images/seat_use.png" alt="">
                </span> 
                <span v-else>
                    <img  src="@/assets/images/desk.png" alt="">
                </span>
              </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { reactive, ref, onMounted, watch } from '@vue/composition-api' 
import {GetSeatList} from '@/api/seat.js'
export default {
    setup(){
        const data = reactive({
            seat: [
                {
                    y: "y108",
                    type: "seat",
                    sx11: 1,
                    sx12: 0,
                    sx13: 1,
                    sx14: 0,
                    nx11: 1,
                    nx12: 1,
                    nx13: 1,
                    nx14: 1,
                }, 
                {
                    y: "d1",
                    sx11: 2,
                    sx12: 2,
                    sx13: 2,
                    sx14: 2,
                    nx11: 2,
                    nx12: 2,
                    nx13: 2,
                    nx14: 2,
                },
                {
                    y: "y109",
                    sx11: 1,
                    sx12: 0,
                    sx13: 1,
                    sx14: 0,
                    nx11: 1,
                    nx12: 1,
                    nx13: 1,
                    nx14: 1,
                }
            ]
        })
        const getList = () =>{
            console.log('ss')
            GetSeatList().then(response => {
                data.seat = response.data.data 
            })
        }
        getList()


        return {
            data,
            getList
        }
    }
}
</script>
<style lang="scss" scoped>
img {
    height: 32px;
}
.padding_right{
    padding-left: 50px;
}
.padding_left{
    padding-right: 50px;
}
</style> 
<style>
.el-table__row>td{
	border: none;
}
</style>