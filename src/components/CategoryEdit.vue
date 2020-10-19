<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">{{
                c.title || "NoValue"
              }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
              v-model="title"
              :class="{ invalid: $v.title.$dirty && !$v.title.required }"
              id="name"
              type="text"
          />
          <label for="name">Название</label>
          <span
              v-if="$v.title.$dirty && !$v.title.required"
              class="helper-text invalid"
          >Введите название</span
          >
        </div>

        <div class="input-field">
          <input
              v-model.number="limit"
              v-bind:class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
              id="limit"
              type="number"
          />
          <label for="limit">Лимит</label>
          <span
              v-if="$v.limit.$dirty && !$v.limit.minValue"
              class="helper-text invalid"
          >Минимальная величина {{ $v.limit.$params.minValue.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";

export default {
  data: () => ({
    select: null,
    title: "",
    limit: 100,
    current: null
  }),
  validations: {
    title: {required},
    limit: {minValue: minValue(100)}
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  created() {
    const {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find(c => c.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        {
          this.$v.$touch();
        }
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категория успешно обновлена');
        this.$emit('updated', categoryData);
      } catch (e) {

      }
    }
  }
};
</script>
