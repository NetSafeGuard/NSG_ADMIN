import * as C from './style';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Error } from '@/components/error';
import { useState, useRef, useContext } from 'react';
import { TableData } from '@/components/table';
import type { User } from '@/@types/User';
import { AuthContext } from '@/contextapi/global.context';
import type { CreateData } from '@/@types/CreateData';
import { UsersContext } from '@/contextapi/users.context';
import { useEffect } from 'react';
import { UserHook } from '@/services/hooks/UserHook';

export const UsersPage = () => {
	const { users } = useContext(UsersContext);
	const [userSearch, setUserSearch] = useState<User[]>(users);

	const { user } = UserHook();
	const Context = useContext(AuthContext);

	useEffect(() => {
		setUserSearch(users);
	}, [users]);

	useEffect(() => {
		if (user.role === 'USER') Context.setSelected('char');
	}, [user]);

	const DataSchema = yup.object().shape({
		username: yup.string().required(),
		email: yup.string().required(),
	});

	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<CreateData>({
		resolver: yupResolver(DataSchema),
	});

	const Create = (data: CreateData) => {
		Context.createUser(data).then(() => {
			setOpen(false);
			reset();
		});
	};

	const searchref = useRef<HTMLInputElement>(null);

	const Search = () => {
		const value = searchref.current?.value;
		if (!value || value === '') return setUserSearch(users);

		const result = users.filter(user =>
			user.username.toLowerCase().includes(value.toLowerCase()),
		);

		setTimeout(() => {
			setUserSearch(result);
		}, 100);
	};

	return (
		<C.Container>
			<C.Title>Utilizadores</C.Title>

			<C.Buttons className="mb-3">
				<C.Input
					type="text"
					placeholder="Pesquisar utilizadores..."
					onChange={Search}
					ref={searchref}
				/>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button className="w-40 gap-1 inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs h-8 border-dashed sm:w-28">
							<IoAddCircleOutline size={16} />
							Add
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Adicionar Utilizador</DialogTitle>
							<DialogDescription>
								Adicione um utilizador à equipa. Clique em Criar para salvar as
								alterações.
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSubmit(Create)}>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right flex gap-1">
										Nome
										{errors.username && <Error error={'*'} />}
									</Label>
									<Input
										id="name"
										onFocus={() => !!watch('username')}
										className="col-span-3"
										{...register('username')}
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="email" className="text-right flex gap-1">
										Email
										{errors.email && <Error error={'*'} />}
									</Label>
									<Input
										id="email"
										onFocus={() => !!watch('email')}
										className="col-span-3"
										type="email"
										{...register('email')}
									/>
								</div>
							</div>
							<DialogFooter>
								<Button type="submit" style={{ background: '#1b4c70' }}>
									{Context.isLoading ? 'A criar...' : 'Criar'}
								</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</C.Buttons>
			<C.TableContainer>
				<TableData users={userSearch} />
			</C.TableContainer>
		</C.Container>
	);
};
