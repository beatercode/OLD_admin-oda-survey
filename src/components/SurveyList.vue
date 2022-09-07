<template>
  <!-- TITLE -->
  <h3 class="mt-2 mb-3 float-left text-primary">Surveys Admin Panel</h3>
  <div class="home">
    <!-- TABLE -->
    <table class="table table-striped">
      <thead>
        <tr class="head-row">
          <th scope="col">Actions</th>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th v-if="windowWidth > 600" scope="col">Mode</th>
          <th v-if="windowWidth > 600" scope="col">Question</th>
        </tr>
      </thead>
      <tbody>
        <tr class="content-row" v-for="survey in surveys" :key="survey.customId">
          <td>
            <form>
              <button
                class="action-button btn btn-sm btn-info mr-1"
                data-bs-toggle="modal"
                data-bs-target="#surveyModal"
                data-bs-whatever="survey"
                @click="openSurvey(survey)"
              >
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </button>
              <button
                @click="deleteSurvey(survey.customId)"
                type="submit"
                class="action-button btn btn-sm btn-danger"
              >
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </form>
          </td>

          <td>{{ survey.customId }}</td>
          <td>{{ survey.name }}</td>
          <td v-if="windowWidth > 600">{{ survey.mode }}</td>
          <td v-if="windowWidth > 600">{{ survey.question }}</td>
        </tr>
      </tbody>
    </table>
    <div class="add-button-row">
      <button
        class="action-button btn btn-sm btn-success"
        data-bs-toggle="modal"
        data-bs-target="#surveyModal"
        data-bs-whatever="survey"
        @click="openSurvey(null)"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
    </div>
    <!-- MODAL -->
    <div
      class="modal fade"
      id="surveyModal"
      tabindex="-1"
      aria-labelledby="surveyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="surveyModalLabel">Inspect Survey</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <h6 class="modal-title survey-row-head" id="surveyModalLabel">Name</h6>
                <input
                  type="text"
                  class="form-control"
                  id="survey-name"
                  v-model="selectedSurvey.name"
                />
              </div>
              <div class="mb-3">
                <h6 class="modal-title survey-row-head" id="surveyModalLabel">Question</h6>
                <textarea
                  class="form-control"
                  id="survey-question"
                  v-model="selectedSurvey.question"
                ></textarea>
              </div>
              <div class="mb-3">
                <h6 class="modal-title survey-row-head" id="surveyModalLabel">Mode</h6>
                <select
                  class="form-control mb-3"
                  aria-label=".form-select-lg example"
                  id="survey-mode"
                  v-model="selectedSurvey.mode"
                  :disabled="selectedSurvey.customId !== null"
                >
                  <option selected="survey">survey</option>
                  <option value="quiz">quiz</option>
                  <option value="novel">novel</option>
                </select>
              </div>
              <div class="mb-3">
                <h6 class="modal-title survey-row-head" id="surveyModalLabel">Republishable</h6>
                <select
                  class="form-control mb-3"
                  aria-label=".form-select-lg example"
                  id="survey-republishable"
                  v-model="selectedSurvey.republishable"
                >
                  <option selected="false">false</option>
                  <option value="true">true</option>
                </select>
              </div>
              <div class="mb-3">
                <h6 class="modal-title survey-row-head" id="surveyModalLabel">WasPublished</h6>
                <select
                  class="form-control mb-3"
                  aria-label=".form-select-lg example"
                  id="survey-waspublished"
                  v-model="selectedSurvey.wasPublished"
                >
                  <option selected="false">false</option>
                  <option value="true">true</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" ref="Close" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="handleSurvey(selectedSurvey)">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'

export default {
  name: 'SurveyList',
  components: {},
  props: {},
  data() {
    return {
      surveys: [],
      toast: null,
      modalActive: false,
      windowWidth: window.innerWidth,
      selectedSurvey: {
        customId: null,
        name: '',
        question: '',
        mode: 'survey',
        republishable: false,
        wasPublished: false,
      },
    }
  },
  mounted() {
    this.toast = useToast()
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  async created() {
    console.log(process.env.VUE_APP_API_BASE)
    fetch(`${process.env.VUE_APP_API_BASE}/survey`)
      .then((response) => response.json())
      .then((data) => {
        this.surveys = data
      })
      .catch((err) => {
        console.error(err)
      })
  },
  methods: {
    async deleteSurvey(id) {
      await fetch(`${process.env.VUE_APP_API_BASE}/survey/${id}`, {
        method: 'DELETE',
      })
        .then(() => this.toast.success('Succesfully deleted'))
        .catch(() => this.toast.error('Error during delete'))
    },

    async handleSurvey() {
      console.log(this.selectedSurvey)
      const id = this.selectedSurvey.customId
      if (id) {
        // UPDATE
        await fetch(`${process.env.VUE_APP_API_BASE}/survey/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customId: this.selectedSurvey.customId,
            name: this.selectedSurvey.name,
            question: this.selectedSurvey.question,
            republishable: this.selectedSurvey.republishable,
            wasPublished: this.selectedSurvey.wasPublished,
          }),
        })
          .then(() => {
            this.toast.success('Succesfully updated')
            this.$refs.Close.click()
          })
          .catch(() => this.toast.error('Error during update'))
      } else {
        // INSERT NEW
        await fetch(`${process.env.VUE_APP_API_BASE}/survey`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.selectedSurvey.name,
            question: this.selectedSurvey.question,
            republishable: this.selectedSurvey.republishable,
            wasPublished: this.selectedSurvey.wasPublished,
          }),
        })
          .then(() => {
            this.toast.success('Succesfully inserted')
            this.$refs.Close.click()
          })
          .catch(() => this.toast.error('Error during insert'))
      }
    },

    openSurvey(s) {
      this.selectedSurvey = s || {
        customId: null,
        name: '',
        question: '',
        mode: 'survey',
        republishable: false,
        wasPublished: false,
      }
    },

    onResize() {
      this.windowWidth = window.innerWidth
    },
  },
}
</script>

<style scoped></style>

<style scoped>
.action-button:not(:last-child) {
  margin-right: 10px;
}
.head-row,
.content-row {
  text-align: left;
}
.content-row > td {
  overflow: hidden;
  white-space: nowrap;
}
table {
  margin-top: 40px;
  overflow: scroll;
}
td {
  vertical-align: middle;
}
textarea {
  resize: none;
}
.survey-row-head {
  text-align: left;
}
.add-button-row {
  widows: 100%;
  text-align: left;
  padding: 0.5rem 0.5rem;
}
.home {
  overflow-x: scroll;
}
</style>
