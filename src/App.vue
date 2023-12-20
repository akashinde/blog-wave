<template>
  <v-app>
    <v-app-bar app color="orange darken-1" dark>
      <img class="mr-3" :src="require('@/assets/wave.png')" height="40"/>
      <div class="d-flex align-center">
        <h1>Blog Wave</h1>
      </div>
      <v-spacer></v-spacer>
      <span>Offline-First Computing</span>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="10" md="8" v-for="blog in allBlogs" :key="blog.id">
            <v-card color="secondary" dark>
              <v-card-title>
                {{ blog.title }}
                <v-spacer></v-spacer>
                <v-btn @click="handleBlogEdit(blog)" icon><v-icon>mdi-pencil</v-icon></v-btn>
              </v-card-title>
              <v-card-subtitle>
                <span class="subtitle-2 grey--text">Created by <strong> {{ blog.author.name }}</strong></span>
              </v-card-subtitle>
              <v-card-text>{{ blog.content }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="updateBlogDialog" width="80%">
        <v-card>
          <v-toolbar flat>
            <h2>
              Editing: {{ selectedBlog.title }}
            </h2>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-form>
                <v-row>
                  <v-col>
                    <v-text-field v-model="selectedBlog.author.id" :rules="v => !!v || 'ID is required'" label="Author ID"
                      required outlined></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="selectedBlog.author.name" :rules="v => !!v || 'Name is required'"
                      label="Author Name" required outlined></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="selectedBlog.author.email" :rules="v => !!v || 'Email is required'"
                      label="Author Email" required outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field v-model="selectedBlog.title" :rules="v => !!v || 'Title is required'" label="Blog Title"
                  required outlined></v-text-field>
                <v-textarea v-model="selectedBlog.content" :rules="v => !!v || 'Content is required'"
                  label="Write content here" required outlined></v-textarea>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="updateBlogDialog = false">Cancel</v-btn>
            <v-btn color="orange darken-1" @click="handleBlogUpdate">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="addBlogDialog" width="80%">
        <v-card>
          <v-toolbar flat>
            <h2>
              Add New Blog
            </h2>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-container>
              <v-form>
                <v-row>
                  <v-col>
                    <v-text-field v-model="newBlog.authorId" :rules="v => !!v || 'ID is required'" label="Author ID"
                      required outlined></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="newBlog.authorName" :rules="v => !!v || 'Name is required'" label="Author Name"
                      required outlined></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="newBlog.authorEmail" :rules="v => !!v || 'Email is required'"
                      label="Author Email" required outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field v-model="newBlog.blogTitle" :rules="v => !!v || 'Title is required'" label="Blog Title"
                  required outlined></v-text-field>
                <v-textarea v-model="newBlog.blogContent" :rules="v => !!v || 'Content is required'"
                  label="Write content here" required outlined></v-textarea>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="addBlogDialog = false">Cancel</v-btn>
            <v-btn color="orange darken-1" @click="handleAddBlog">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="add-btn">
        <v-btn @click="addBlogDialog = true" x-large rounded color="orange darken-1"><v-icon>mdi-plus</v-icon></v-btn>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BlogsService from '@/services/BlogsService'

export default Vue.extend({
  name: "App",
  data: () => ({
    addBlogDialog: false,
    updateBlogDialog: false,
    newBlog: {
      authorId: null,
      authorName: '',
      authorEmail: '',
      blogTitle: '',
      blogContent: ''
    },
    selectedBlog: {
      title: '',
      content: '',
      author: {
        id: null,
        name: '',
        email: ''
      }
    },
    allBlogs: [
      {
        "id": 4,
        "title": "The Enigmatic Universe",
        "content": "Exploring the mysteries of dark matter and black holes.",
        "createdAt": "2023-12-19T23:34:57.532246",
        "modifiedAt": "2023-12-19T23:34:57.532262",
        "version": 1.0,
        "author": {
          "id": 1,
          "name": "Akash",
          "email": "akash@email.com"
        }
      },
      {
        "id": 5,
        "title": "A Culinary Adventure",
        "content": "Delicious recipes from around the world that will tickle your taste buds.",
        "createdAt": "2023-12-19T23:35:33.929649",
        "modifiedAt": "2023-12-19T23:35:33.92967",
        "version": 1.0,
        "author": {
          "id": 2,
          "name": "Ankur",
          "email": "ankur@email.com"
        }
      },
      {
        "id": 6,
        "title": "Inspirational Stories",
        "content": "Heartwarming tales of triumph and resilience.",
        "createdAt": "2023-12-19T23:36:07.011213",
        "modifiedAt": "2023-12-19T23:36:07.011233",
        "version": 1.0,
        "author": {
          "id": 3,
          "name": "Abhisar",
          "email": "abhisar@email.com"
        }
      },
      {
        "id": 7,
        "title": "Tech Trends 2023",
        "content": "The latest innovations shaping our digital future.",
        "createdAt": "2023-12-19T23:36:31.949826",
        "modifiedAt": "2023-12-19T23:36:31.94985",
        "version": 1.0,
        "author": {
          "id": 4,
          "name": "Tahura",
          "email": "tahura@email.com"
        }
      },
      {
        "id": 8,
        "title": "Fitness Fundamentals",
        "content": "Unlocking the secrets to a healthier and more active lifestyle.",
        "createdAt": "2023-12-19T23:36:56.922432",
        "modifiedAt": "2023-12-19T23:36:56.922451",
        "version": 1.0,
        "author": {
          "id": 5,
          "name": "Samiul",
          "email": "samiul@email.com"
        }
      }
    ]
  }),
  methods: {
    handleAddBlog: async function () {
      const { authorId, authorEmail, authorName, blogTitle, blogContent } = this.newBlog
      const newObj = {
        title: blogTitle,
        content: blogContent,
        author: {
          id: authorId,
          name: authorName,
          email: authorEmail
        }
      }
      // fetch('http://localhost:8181/api/v1/blogs', {
      //   method: 'POST',
      //   mode: 'no-cors',
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(this.newObj)
      // })
      this.allBlogs.push(newObj)
      this.addBlogDialog = false
    },
    getAllBlogs: async function () {
      BlogsService.getAllBlogs().then((res) => {
        console.log(res.data)
      })
      // fetch('http://localhost:8181/api/v1/blogs', {
      //   method: "GET",
      //   mode: 'no-cors'
      // })
      //   .then((response) => response.json())
      //   .then((data) => this.allBlogs = data)
      //   .catch((err) => {
      //     console.error(err);
      //   });
    },
    handleBlogEdit: async function (item) {
      this.selectedBlog = item
      this.updateBlogDialog = true
    },
    handleBlogUpdate: function () {
      // Api to update the blog
    }
  },
  created() {
    this.getAllBlogs();
  }
})
</script>

<style>
.add-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  margin-bottom: 5%;
  margin-right: 5%;
}
</style>