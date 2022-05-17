<!--<template>-->
<!--    <div class="date">-->
<!--        <div class="total_block">-->
<!--            <h4>Ընդհանուր: <span>{{parseFloat(this.total_expense).toFixed(2)}}</span></h4>-->
<!--        </div>-->
<!--    </div>-->

<!--    <div class="table_standard">-->
<!--        <div class="thead">-->
<!--            <div class="tr">-->
<!--                <div class="th">Անուն</div>-->
<!--                <div class="th">Նկարագրություն</div>-->
<!--                <div class="th">գինը</div>-->
<!--                <div class="th">ստեղծման օր</div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="tbody">-->
<!--            <div class="tr" v-for="expense in expenses" :key="expense.id">-->
<!--                <div class="td">{{expense.name}}</div>-->
<!--                <div class="td">{{expense.description}}</div>-->
<!--                <div class="td">{{expense.price}}</div>-->
<!--                <div class="td">{{expense.creation_date}}</div>-->


<!--                &lt;!&ndash;                <div class="menu">&ndash;&gt;-->
<!--                &lt;!&ndash;                    <ul>&ndash;&gt;-->
<!--                &lt;!&ndash;                        <li>&ndash;&gt;-->
<!--                &lt;!&ndash;                            <router-link :to="'/home'">&ndash;&gt;-->
<!--                &lt;!&ndash;                                <img src="@/assets/icons/edit.png" alt="">&ndash;&gt;-->
<!--                &lt;!&ndash;                                Խմբագրել&ndash;&gt;-->
<!--                &lt;!&ndash;                            </router-link>&ndash;&gt;-->
<!--                &lt;!&ndash;                        </li>&ndash;&gt;-->
<!--                &lt;!&ndash;                        <li>&ndash;&gt;-->
<!--                &lt;!&ndash;                            <a href="#">&ndash;&gt;-->
<!--                &lt;!&ndash;                                <img src="@/assets/icons/delete.png" alt="">&ndash;&gt;-->
<!--                &lt;!&ndash;                                Հեռացնել&ndash;&gt;-->
<!--                &lt;!&ndash;                            </a>&ndash;&gt;-->
<!--                &lt;!&ndash;                        </li>&ndash;&gt;-->
<!--                &lt;!&ndash;                    </ul>&ndash;&gt;-->
<!--                &lt;!&ndash;                </div>&ndash;&gt;-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "v-expense-table",-->
<!--        data(){-->
<!--            return{-->
<!--                total_expense: 0,-->
<!--                expenses: []-->
<!--            }-->
<!--        },-->
<!--        mounted(){-->
<!--            this.get_expenses()-->
<!--        },-->
<!--        methods: {-->
<!--            get_expenses(){-->
<!--                this.$store.dispatch("expense/GET_ALL_EXPENSES", null).then(data => {-->
<!--                    if(data.success){-->
<!--                        this.expenses = data.obj-->
<!--                        this.total_expense += parseFloat(data.obj.price)-->
<!--                    }-->

<!--                })-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    .tr{-->
<!--        grid-template-columns: 1fr 1fr 1fr 1fr;-->
<!--    }-->
<!--    .total_block{-->
<!--        display: flex;-->
<!--        grid-gap: 2em;-->
<!--    }-->
<!--    .date{-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        justify-content: flex-end;-->
<!--        grid-gap: 1em;-->
<!--        margin-bottom: 10px;-->
<!--    }-->
<!--</style>-->