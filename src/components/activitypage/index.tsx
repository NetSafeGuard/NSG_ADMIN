import type { Activity } from '@/@types/Activity';
import * as C from './style';
import type React from 'react';
import { TableDomainsData } from './table';
import { IoChevronBackCircle } from 'react-icons/io5';
import * as yup from 'yup';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { PlusIcon } from '@radix-ui/react-icons';
import { ActivitiesContext } from '@/contextapi/activities.context';
import { useContext } from 'react';
import { IoTrashOutline } from 'react-icons/io5';

interface Props {
	activity: Activity;
	setActivity: (activity: Activity) => void;
}

export const SingleActivity: React.FC<Props> = ({ activity, setActivity }: Props) => {
	const { isLoading, AddDomain, Delete } = useContext(ActivitiesContext);

	const handleBack = () => {
		setActivity({} as Activity);
	};

	const handleDelete = (id: number) => () => {
		Delete(id).then(() => {
			setActivity({} as Activity);
		});
	}

	const handleAddDomain = (data: Domain) => {
		AddDomain(activity.id!, data.name).then(() => {
			reset();
		});
	};

	const DataSchema2 = yup.object().shape({
		name: yup.string().required(),
	});

	interface Domain {
		name: string;
	}

	const { register, handleSubmit, watch, reset } = useForm<Domain>({
		resolver: yupResolver(DataSchema2),
	});

	return (
		<C.Container>
			<C.Title>
				<span onClick={handleBack}>
					<IoChevronBackCircle size={25} color="1b4c70" />
				</span>
				{activity.title}
			</C.Title>

			<C.Description>
				Criado por: <span>{activity.creator!.username}</span>
			</C.Description>
			<C.SubTitle>Dominios permitidos</C.SubTitle>

			<C.ActivityContainer>
				<TableDomainsData activityDomains={activity.activityDomains} />
			</C.ActivityContainer>

			<C.ButtonDeleteContainer>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="outline">
							<IoTrashOutline />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Tem realmente a certeza?</AlertDialogTitle>
							<AlertDialogDescription>
								Esta ação fará com que a atividade seja apagada.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDelete(activity.id!)}
								style={{ background: '#1b4c70' }}>
								Confirmar
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</C.ButtonDeleteContainer>

			<C.ButtonContainer>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							<PlusIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56 mb-5" side="right">
						<DropdownMenuLabel>Adicionar Domínio</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Sheet>
								<SheetTrigger asChild>
									<p className="flex items-center gap-2 px-2 py-2 text-sm rounded-md cursor-pointer hover:bg-accent hover:bg-opacity-10">
										<span>Adicionar</span>
									</p>
								</SheetTrigger>
								<SheetContent className="w-[500px] sm:[100%] mt-8">
									<SheetHeader>
										<SheetTitle>Adição de Domínio</SheetTitle>
										<SheetDescription>
											Preencha os campos abaixo para adicionar um domínio
										</SheetDescription>
									</SheetHeader>
									<form onSubmit={handleSubmit(handleAddDomain)}>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label htmlFor="name" className="text-right">
													Dominio
												</Label>
												<Input
													id="name"
													onFocus={() => !!watch('name')}
													className="col-span-3"
													{...register('name')}
												/>
											</div>
										</div>
										<SheetFooter>
											<SheetClose asChild>
												<Button
													type="submit"
													style={{ background: '#1b4c70' }}>
													{isLoading ? 'A adicionar...' : 'Adicionar'}
												</Button>
											</SheetClose>
										</SheetFooter>
									</form>
								</SheetContent>
							</Sheet>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</C.ButtonContainer>
		</C.Container>
	);
};
