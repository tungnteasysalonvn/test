import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { New } from '../../@types';
import newApi from '../../apis/new.api';
import Input from '../../components/Input';
import Label from '../../components/Label';

type FormState = Omit<New, 'id'>;

const formDefault: FormState = {
	author: '',
	description: '',
	imageURL: '',
	title: '',
};

const Form = () => {
	const navigate = useNavigate();
	const [queryParams] = useSearchParams();
	const qrId = queryParams.get('id');

	const { register, handleSubmit, reset, control } = useForm<New>({
		defaultValues: formDefault,
	});
	const mutateCreateNew = useMutation({
		mutationFn: (body: FormState) => newApi.createNew(body),
	});
	const newItemQuery = useQuery({
		queryKey: ['new', qrId],
		queryFn: () => newApi.getNewItem(qrId as string),
		enabled: qrId !== null,
		onSuccess: (data) => {
			reset(data.data);
		},
	});
	const updateMutate = useMutation({
		mutationFn: (body: New) => newApi.updateNew(qrId as string, body),
	});
	const handleNew = handleSubmit((values) => {
		if (qrId) {
			updateMutate.mutate(values, {
				onSuccess: () => {
					toast.success('Update Successfully!!!');
					navigate('/blogs');
				},
				onError(error) {
					console.log(error);
				},
			});
		} else {
			mutateCreateNew.mutate(values, {
				onSuccess() {
					toast.success('New created successfully');
					navigate('/blogs');
				},
			});
		}
	});

	return (
		<div className='my-4'>
			<h2 className='mb-4 text-center text-xl font-semibold text-blue-500'>
				{qrId ? 'Update New' : 'Create New'}
			</h2>
			<form className=' mx-auto flex w-[500px] flex-col gap-8 p-4 shadow-md' onSubmit={handleNew}>
				<div>
					<Label id='title'>Title</Label>
					<Controller
						control={control}
						name='title'
						render={({ field }) => <Input placeholder='Title...' id='title' {...field} />}
					/>
				</div>
				<div>
					<Label id='content'>Content</Label>
					<textarea
						placeholder='Content...'
						id='content'
						className='w-full rounded-md border p-2 outline-none focus:border-blue-500'
						{...register('description')}
						required
					/>
				</div>
				<div>
					<Label id='img'>Image URL</Label>
					<Controller
						control={control}
						name='imageURL'
						render={({ field }) => <Input placeholder='image url...' id='img' {...field} />}
					/>
				</div>
				<div>
					<Label id='author'>Author</Label>
					<Controller
						control={control}
						name={'author'}
						render={({ field }) => (
							<Input placeholder='Author...' id='author' {...field} readOnly={Boolean(qrId)} />
						)}
					/>
				</div>
				<button className='rounded-md bg-blue-500 py-2 text-white'>
					{qrId ? 'Update' : 'Create'}
				</button>
			</form>
		</div>
	);
};

export default Form;
