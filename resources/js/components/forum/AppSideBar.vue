<template>
    <v-card>
        <v-toolbar color='cyan' dark dense class='mt-3'>
            <v-toolbar-title>Categories</v-toolbar-title>
        </v-toolbar>

        <v-list rounded>
            <v-list-item-group color="primary">
                <v-list-item
                v-for="category in categories"
                :key="category.id"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ category.name }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
import AuthHeader from '../../Helpers/AuthHeader';
export default {
    data() {
        return {
            categories : null,
            errors: null
        }
    },
    created() {
        const headers = AuthHeader.getHeaders();
        axios.get('/api/categories', {headers})
            .then(res => {
                this.categories = res.data;
            })
            .catch(e => console.log(e.response.data));
    }

}
</script>
