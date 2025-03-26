import { ErrorMessage } from '../Message';

export const categoryValidator = [
    {
        required: true,
        message: 'Vui lòng nhập tên danh mục!',
    },
    {
        validator(_: any, value: string) {
            if (value && value.length < 2) {
                return ErrorMessage('Tên danh mục phải lớn hơn 2 kí tự');
            }
            if (value && value.length > 30) {
                return ErrorMessage('Tên danh mục phải nhỏ hơn 30 kí tự');
            }
            return Promise.resolve();
        },
    },
];
