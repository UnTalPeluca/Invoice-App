import { createStore } from 'vuex'
import Firebase from '@/firebase/firebaseinit'
import { collection, doc, setDoc, getDocs, deleteDoc, getDoc } from "firebase/firestore";
import router from '@/router'

export default createStore({
  state: {
    invoices:[],
    invoice: {}, //for create and details
    showCreate: false,
    showEdit: false,
    details: false,
    loading: true,
    blur: true,
    filteredAmount: 0,
  },

  mutations: {
    SET_INVOICES(state, value) {
      state.invoices = value
    },
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_BLUR(state, value) {
      state.blur = value
    },
    SET_SHOWCREATE(state, value) {
      state.showCreate = value
    },
    SET_INVOICE(state, value) {
      state.invoice = value
    },
    SET_SHOWEDIT(state, value) {
      state.showEdit = value
    },
    SET_FILTERED_AMOUNT(state, value) {
      state.filteredAmount = value
    },
  },  

  actions: {

    // Get data from invoices list
    async fetchInvoice({ commit, state }, id, reload) {
      commit('SET_LOADING', true)
      commit('SET_BLUR', true)
      if(reload){
        const existingInvoice = state.invoices.find(invoice => invoice.id === id)
        commit('SET_INVOICE', existingInvoice)
      } else{
        const docRef = doc(Firebase.db, "invoice", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          commit('SET_INVOICE', docSnap)
        } else {
          console.log("No such document!");
        }
      }
      commit('SET_LOADING', false)
      commit('SET_BLUR', false)
    },
    // Get data from Firebase
    async fetchInvoices({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_BLUR', true)
      try{
        const result = []
        const fetch = await (await getDocs(collection(Firebase.db, "invoice")))
        fetch.forEach(res =>{
          result.push(res)
        })
        commit('SET_INVOICES', result)
      } 
      catch (e) {
        console.error("Error reading document: ", e)
      }
      commit('SET_LOADING', false)
      commit('SET_BLUR', false)
    },
    //Post data on Firebase
    async postInvoice({ commit }, {id, data, status}) {
      commit('SET_LOADING', true)
      commit('SET_BLUR', true)
      data.status = status
      try{
        await setDoc(doc(Firebase.db, "invoice", id), data )
      } 
      catch (e) {
        console.error("Error reading document: ", e)
      }
      commit('SET_LOADING', false)
      commit('SET_BLUR', false)
      router.push("/")
    },
    //Delete doc on firebase
    async deleteInvoice({ commit }, {id}) {
      commit('SET_LOADING', true)
      commit('SET_BLUR', true)
      try{
        await deleteDoc(doc(Firebase.db, "invoice", id))
      } 
      catch (e) {
        console.error("Error deleating document: ", e)
      }
      commit('SET_LOADING', false)
      commit('SET_BLUR', false)
      router.push("/")
    },
    //Invoice Toogles
    setInvoiceCreate({ commit }, value) {
      commit('SET_SHOWCREATE', value)
      commit('SET_BLUR', value)
    },
    setLoading({ commit }, value) {
      commit('SET_LOADING', value)
      commit('SET_BLUR', value)
    },
    setShowEdit({ commit }, value) {
      commit('SET_SHOWEDIT', value)
      commit('SET_BLUR', value)
    },
    setInvoiceAmount({commit}, value) {
      commit('SET_FILTERED_AMOUNT', value)
    }
  },
  modules: {

  }
})
