import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Пожайлуста, введите email')
            .email('Необходимо ввести корректный email'),
    );
    const  MIN_LENGTH = 6;
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Пожайлуста введите пароль')
            .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
    );
    const isTooManyAttempts = computed(() => submitCount.value >= 3);
    watch(isTooManyAttempts, val=> {
        if (val) {
            setTimeout(() => {
                if (isTooManyAttempts.value) {
                    submitCount.value = 0
                }
            }, 2000);
        }
    });
    const onSubmit = handleSubmit(async values => {
            try {
                console.log('Form:', values);
                // Здесь добавьте вашу логику (например, отправка на сервер)
                await store.dispatch('auth/login', values)
                router.push('/')
            } catch (e) {
                console.error('Ошибка:', e);
            }
        },
    );
    return {
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts,
    };
}