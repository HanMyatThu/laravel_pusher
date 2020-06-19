<template>
   <v-container fluid grid-list-md>
       <v-layout>
           <v-flex xs8>
               <question
                v-for='question in questions'
                :key='question.path'
                :data=question
                >

               </question>
           </v-flex>


           <v-flex xs4>
               <app-side-bar></app-side-bar>
           </v-flex>
       </v-layout>
   </v-container>
</template>

<script>
import question from './Question'
import AppSideBar from './AppSideBar'
import AuthHeader from '../../Helpers/AuthHeader';
export default {
    data() {
        return {
            questions: null
        }
    },
    components: {question , AppSideBar},
    created() {
        const headers = AuthHeader.getHeaders();
        axios.get('/api/questions', { headers })
            .then(res => this.questions = res.data.data)
            .catch(e => console.log(e.response.data));
    }
}
</script>
