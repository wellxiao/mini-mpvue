import {
    request
} from "@/utils/http";

export default {
    namespaced: true, // 不设置时全局
    state: {
        count: 0
    },
    mutations: {
        add: state => {
            console.log("增加一次");
            state.count++;
        },
        dce: state => {
            console.log("减少一次");
            state.count--;
        }
    },
    actions: {
        // payLoad 传参数过来
        increment: (state, payload) => {
            const {
                commit
            } = state;
            commit("add");
        },
        decrement: (state, payload) => {
            const {
                commit
            } = state;
            commit("dce");
        },
        handleClick: (state, payload) => {
            console.log('先加两次，再减三次')
            const {
                dispatch
            } = state
            dispatch({
                type: 'increment',
                payload
            })
            dispatch({
                type: 'increment',
                payload
            })
            dispatch({
                type: 'decrement',
                payload
            })
            dispatch({
                type: 'decrement',
                payload
            })
            dispatch({
                type: 'decrement',
                payload
            })

        },
        // 这里事例去调用接口
        async httpDemoFn({
            commit
        }, payload) {
            try {
                const {
                    result
                } = await request({
                    url,
                    methods: "post",
                    commit
                });
                return Promise.resolve(result)
            } catch (error) {
                return Promise.resolve(error)
            }
        }
    }
};