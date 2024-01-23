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
                <v-btn @click="toggleBlogEdit(blog)" icon><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn @click="handleBlogDelete(blog)" icon><v-icon>mdi-delete</v-icon></v-btn>
              </v-card-title>
              <v-card-subtitle>
                <span class="subtitle-2 grey--text">Created by <strong> {{ blog.author.name }}</strong></span>
              </v-card-subtitle>
              <v-card-text>{{ blog.content }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- Update Blog Dialog -->
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
      <!-- Create Blog Dialog -->
      <v-dialog v-model="createBlogDialog" width="80%">
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
                    <v-text-field type="number" v-model="newBlog.authorId" :rules="[v => !!v || 'ID is required']" label="Author ID"
                      required outlined></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="newBlog.authorName" :rules="[v => !!v || 'Name is required']" label="Author Name"
                      required outlined></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="newBlog.authorEmail" :rules="[v => !!v || 'Email is required']"
                      label="Author Email" required outlined></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field v-model="newBlog.blogTitle" :rules="[v => !!v || 'Title is required']" label="Blog Title"
                  required outlined></v-text-field>
                <v-textarea v-model="newBlog.blogContent" :rules="[v => !!v || 'Content is required']"
                  label="Write content here" required outlined></v-textarea>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="createBlogDialog = false">Cancel</v-btn>
            <v-btn color="orange darken-1" @click="handleCreateBlog">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="add-btn">
        <v-btn @click="createBlogDialog = true" x-large rounded color="orange darken-1"><v-icon>mdi-plus</v-icon></v-btn>
      </div>
      <v-snackbar v-model="snackbarModel"
      color="orange"
      outlined
      text
      >
        {{ response }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import BlogsService from '@/services/BlogsService'

export default Vue.extend({
  name: "App",
  data: () => ({
    createBlogDialog: false,
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
    allBlogs: [],
    snackbarModel: false,
    response: ''
  }),
  methods: {
    handleCreateBlog: function () {
      const { authorId, authorEmail, authorName, blogTitle, blogContent } = this.newBlog
      const newBlog = {
        title: blogTitle,
        content: blogContent,
        author: {
          id: Number(authorId),
          name: authorName,
          email: authorEmail
        }
      }
      BlogsService.createBlog(newBlog)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
      this.createBlogDialog = false
    },
    getAllBlogs: function () {
      BlogsService.getAllBlogs()
        .then((res) => {
            this.allBlogs = res.data
        })
        .catch((err) => {
            console.log(err)
        })
    },
    toggleBlogEdit: function (item) {
      this.selectedBlog = item
      this.updateBlogDialog = true
    },
    handleBlogUpdate: function () {
      BlogsService.modifyBlog
        (
          this.selectedBlog.id, 
          this.selectedBlog.title, 
          this.selectedBlog.content
        )
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleBlogDelete: function (item) {
      BlogsService.deleteBlog
        (
          item.id
        )
        .then((res) => {
          this.response = res.data
          this.snackbarModel = true
          console.log(res)
        })
        .catch((err) => {
          this.response = err.data
          this.snackbarModel = true
          console.log(err)
        })
        .finally(() => {
          this.getAllBlogs()
        })
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