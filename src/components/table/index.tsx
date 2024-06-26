import type { User } from '@/@types/User';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { EditData } from '@/@types/EditData';
import { Error } from '@/components/error';
import { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthContext } from '@/contextapi/global.context';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Badge } from '@/components/ui/badge';
import admin from '../../assets/admin.png';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type Props = {
	users: User[];
};

export const TableData = ({ users }: Props) => {
	const [AnimationParent] = useAutoAnimate();
	const [open, setOpen] = useState(false);
	const [editedUser, setEditedUser] = useState<User | null>(null);

	const DataSchema = yup.object().shape({
		username: yup.string().required(),
		email: yup.string().required(),
		avatar: yup.string().required(),
		role: yup.string().required(),
	});

	const Context = useContext(AuthContext);

	const {
		control,
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<EditData>({
		resolver: yupResolver(DataSchema),
	});

	const Edit = (data: EditData) => {
		Context.editUser(editedUser!, data).then(() => {
			setOpen(false);
			reset();
		});
	};

	const deleteUser = () => {
		Context.deleteUser(editedUser!).then(() => {
			setOpen(false);
			reset();
		});
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Avatar</TableHead>
					<TableHead>Nome de utilizador</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Criado há</TableHead>
					<TableHead className="text-right pr-6">Editar</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody ref={AnimationParent}>
				{users.map((user: User) => (
					<TableRow key={user.email}>
						<TableCell>
							<Avatar>
								<AvatarImage src={user.avatar} alt={user.username} />
								<AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
							</Avatar>
						</TableCell>

						<TableCell>
							{user.username}

							{user.role === 'ADMIN' && (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Badge className="bg-transparent hover:bg-transparent shadow-none">
												<img
													src={admin}
													alt="Administrador"
													className="h-4 w-4"
												/>
											</Badge>
										</TooltipTrigger>
										<TooltipContent
											side="top"
											align="center"
											className="whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground rounded-md px-3 text-xs h-8 border-dashed">
											<p className="text-sm text-black">
												Administrador Verificado
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{formatDate(new Date(user.createdAt))}</TableCell>
						<TableCell className="text-right">
							<Dialog open={open && editedUser === user} onOpenChange={setOpen}>
								<DialogTrigger asChild>
									<Button
										className="text-[#1b4c70] hover:text-[#2D9CDB] focus:outline-none bg-transparent hover:bg-inherit"
										onClick={() => {
											setEditedUser(user);
											setOpen(true);
											reset();
										}}>
										Editar
									</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>Editar Utilizador</DialogTitle>
										<DialogDescription>
											Clique em editar para salvar as alterações.
										</DialogDescription>
									</DialogHeader>
									<form onSubmit={handleSubmit(Edit)}>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label
													htmlFor="name"
													className="text-right flex gap-1">
													Nome
													{errors.username && <Error error={'*'} />}
												</Label>
												<Input
													id="name"
													onFocus={() => !!watch('username')}
													className="col-span-3"
													{...register('username')}
													defaultValue={user.username}
													maxLength={40}
												/>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label
													htmlFor="email"
													className="text-right flex gap-1">
													Email
													{errors.email && <Error error={'*'} />}
												</Label>
												<Input
													id="email"
													onFocus={() => !!watch('email')}
													className="col-span-3"
													type="email"
													defaultValue={user.email}
													maxLength={60}
													{...register('email')}
												/>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label
													htmlFor="avatar"
													className="text-right flex gap-1">
													Avatar
													{errors.avatar && <Error error={'*'} />}
												</Label>
												<Input
													id="avatar"
													onFocus={() => !!watch('avatar')}
													className="col-span-3"
													type="text"
													maxLength={200}
													defaultValue={user.avatar}
													{...register('avatar')}
												/>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label
													htmlFor="role"
													className="text-right flex gap-1">
													Cargo
												</Label>
												<Controller
													name="role"
													control={control}
													defaultValue={user.role}
													render={({ field }) => (
														<Select
															{...field}
															defaultValue={user.role}
															onValueChange={e => {
																field.onChange(e);
															}}>
															<SelectTrigger className="col-span-3">
																<SelectValue />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="USER">
																	Utilizador
																</SelectItem>
																<SelectItem value="ADMIN">
																	Administrador
																</SelectItem>
															</SelectContent>
														</Select>
													)}
												/>
											</div>
										</div>
										<DialogFooter>
											<Button
												onClick={() => deleteUser()}
												type="button"
												style={{ background: '#f5766f' }}>
												{Context.isLoading2 ? 'A Apagar...' : 'Apagar'}
											</Button>
											<Button type="submit" style={{ background: '#1b4c70' }}>
												{Context.isLoading ? 'A editar...' : 'Editar'}
											</Button>
										</DialogFooter>
									</form>
								</DialogContent>
							</Dialog>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

function formatDate(data: Date): string {
	const now = new Date();

	const seconds = Math.floor((now.getTime() - data.getTime()) / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(weeks / 4);

	if (months > 0) {
		return `${months} mês${months === 1 ? '' : 'es'} atrás`;
	}
	if (weeks > 0) {
		return `${weeks} semana${weeks === 1 ? '' : 's'} atrás`;
	}
	if (days > 0) {
		return `${days} dia${days === 1 ? '' : 's'} atrás`;
	}
	if (hours > 0) {
		return `${hours} hora${hours === 1 ? '' : 's'} atrás`;
	}
	if (minutes > 0) {
		return `${minutes} minuto${minutes === 1 ? '' : 's'} atrás`;
	}

	return 'agora mesmo';
}
