import { ErrorMessage } from '~/validation/Message';

export const tagNameValidator = [
    {
        required: true,
        message: 'Vui lòng nhập tên thẻ!',
    },
    {
        validator(_: any, value: string) {
            if (value && value.length < 2) {
                return ErrorMessage('Tên thẻ phải lớn hơn 2 kí tự');
            }
            if (value && value.length > 30) {
                return ErrorMessage('Tên thẻ phải nhỏ hơn 30 kí tự');
            }
            return Promise.resolve();
        },
    },
];
