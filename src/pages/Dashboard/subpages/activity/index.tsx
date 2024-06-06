import * as C from './style';
import { PlusIcon } from '@radix-ui/react-icons';
import { type Locale, format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import MultiSelectFormField from '@/components/ui/multi-select';
import { useForm, Controller } from 'react-hook-form';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useContext } from 'react';
import { GroupsContext } from '@/contextapi/groups.context';
import { useState } from 'react';
import { Form, FormField, FormControl, FormItem } from '@/components/ui/form';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '../../../../../@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { TimePickerDemo } from '@/components/ui/time-picker';
import { Calendar as CalendarIcon } from 'lucide-react';
import ptLocale from 'date-fns/locale/pt';
import { ActivitiesContext } from '@/contextapi/activities.context';

export const ActivityPage = () => {
	const [open, setOpen] = useState(false);
	const [createActivity, setCreateActivity] = useState(false);
	const { groups } = useContext(GroupsContext);
	const context = useContext(ActivitiesContext);

	const DataSchema = yup.object().shape({
		title: yup.string().required(),
		description: yup.string().required(),
		startDate: yup.date().required(),
		endDate: yup.date().required(),
		groups: yup.array().of(yup.string()),
	});

	type FormSchemaType = yup.InferType<typeof DataSchema>;

	const form = useForm<FormSchemaType>({
		resolver: yupResolver(DataSchema),
	});

	console.log(form.formState.errors);

	const { activities } = useContext(ActivitiesContext);

	const submit = (data: FormSchemaType) => {
		context.Create({
			...data,
			groups: (data.groups as string[]) ?? ([] as string[]),
		});
		form.reset();
	};

	return (
		<C.Container>
			<C.Title>Atividades Avaliativas</C.Title>
			<C.ActivityContainer>
				{activities.map((activity, index) => (
					<>
						{activity.startDate.getDate() ===
						activities[index - 1]?.startDate.getDate() ? (
							<C.ActivityCard key={index}>
								<C.ActivityTitle>{activity.title}</C.ActivityTitle>
								<C.ActivityDescription>
									{activity.description}
								</C.ActivityDescription>
							</C.ActivityCard>
						) : (
							<>
								<C.ActivityDate key={index}>
									{activity.startDate.getDate()}{' '}
									{activity.startDate.toLocaleString('default', {
										month: 'short',
									})}{' '}
								</C.ActivityDate>
								<C.ActivityCard key={index}>
									<C.ActivityTitle>{activity.title}</C.ActivityTitle>
									<C.ActivityDescription>
										{activity.description}
									</C.ActivityDescription>
								</C.ActivityCard>
							</>
						)}
					</>
				))}
			</C.ActivityContainer>
			<C.ButtonContainer>
				<DropdownMenu open={open} onOpenChange={setOpen}>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							<PlusIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56 mb-5" side="right">
						<DropdownMenuLabel>Criação de Atividade</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								onClick={() => setCreateActivity(true)}
								className="cursor-pointer">
								<p className="flex items-center text-sm rounded-md hover:bg-accent hover:bg-opacity-10">
									<span>URL</span>
								</p>
							</DropdownMenuItem>
							<DropdownMenuItem>
								Arquivo (WIP)
								<DropdownMenuShortcut>Desativado</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</C.ButtonContainer>
			<Sheet open={createActivity} onOpenChange={setCreateActivity}>
				<SheetContent className="w-[500px] sm:[100%] mt-8">
					<C.ContainerScroll>
						<SheetHeader>
							<SheetTitle>Criar Atividade</SheetTitle>
							<SheetDescription>
								Preencha os campos abaixo para criar uma atividade
							</SheetDescription>
						</SheetHeader>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(submit)}>
								<div className="grid gap-4 py-4">
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="title" className="text-left">
											Titulo
										</Label>
										<Input
											id="name"
											className="col-span-3"
											{...form.register('title')}
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="username" className="text-left">
											Descrição
										</Label>
										<Input
											id="username"
											className="col-span-3"
											{...form.register('description')}
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="username" className="text-left">
											Data de ínicio
										</Label>
										<FormField
											control={form.control}
											name="startDate"
											render={({ field }) => (
												<FormItem
													className="flex flex-col"
													style={{ width: '228.8px' }}>
													<Popover>
														<FormControl>
															<PopoverTrigger asChild>
																<Button
																	variant="outline"
																	style={{
																		maxWidth: '250px',
																	}}
																	className={cn(
																		'justify-start text-left font-normal',
																		!field.value &&
																			'text-muted-foreground',
																	)}>
																	<CalendarIcon className="mr-2 h-4 w-4" />
																	{field.value ? (
																		format(
																			field.value,
																			'PPP HH:mm',
																			{
																				locale: ptLocale as unknown as Locale,
																			},
																		)
																	) : (
																		<span>
																			Escolha uma data
																		</span>
																	)}
																</Button>
															</PopoverTrigger>
														</FormControl>
														<PopoverContent
															className="w-auto p-0 absolute -right-16 -top-14 overflow-scroll"
															style={{
																maxHeight: '250px',
																scrollbarWidth: 'thin',
															}}>
															<Calendar
																mode="single"
																selected={field.value}
																onSelect={field.onChange}
																lang="pt"
																locale={
																	ptLocale as unknown as Locale
																}
																initialFocus
															/>
															<div className="p-3 border-t border-border">
																<TimePickerDemo
																	setDate={field.onChange}
																	date={field.value}
																/>
															</div>
														</PopoverContent>
													</Popover>
												</FormItem>
											)}
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="endDate" className="text-left">
											Data de término
										</Label>
										<FormField
											control={form.control}
											name="endDate"
											render={({ field }) => (
												<FormItem
													className="flex flex-col"
													style={{ width: '228.8px' }}>
													<Popover>
														<FormControl>
															<PopoverTrigger asChild>
																<Button
																	variant="outline"
																	style={{
																		maxWidth: '250px',
																	}}
																	className={cn(
																		'justify-start text-left font-normal',
																		!field.value &&
																			'text-muted-foreground',
																	)}>
																	<CalendarIcon className="mr-2 h-4 w-4" />
																	{field.value ? (
																		format(
																			field.value,
																			'PPP HH:mm',
																			{
																				locale: ptLocale as unknown as Locale,
																			},
																		)
																	) : (
																		<span>
																			Escolha uma data
																		</span>
																	)}
																</Button>
															</PopoverTrigger>
														</FormControl>
														<PopoverContent
															className="w-auto p-0 absolute -right-16 -top-14 overflow-scroll"
															style={{
																maxHeight: '250px',
																scrollbarWidth: 'thin',
															}}>
															<Calendar
																mode="single"
																selected={field.value}
																onSelect={field.onChange}
																lang="pt"
																locale={
																	ptLocale as unknown as Locale
																}
																initialFocus
															/>
															<div className="p-3 border-t border-border">
																<TimePickerDemo
																	setDate={field.onChange}
																	date={field.value}
																/>
															</div>
														</PopoverContent>
													</Popover>
												</FormItem>
											)}
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4 w-full">
										<Label htmlFor="role" className="text-right flex gap-1">
											Grupos
										</Label>
										<Controller
											name="groups"
											control={form.control}
											render={({ field }) => (
												<MultiSelectFormField
													className=""
													options={groups.map(group => ({
														label: group.name,
														value: group.name,
													}))}
													onValueChange={field.onChange}
													placeholder="Selecione os grupos"
													variant="inverted"
													style={{ width: '230px' }}
												/>
											)}
										/>
									</div>
								</div>
								<SheetFooter>
									<SheetClose asChild>
										<Button style={{ background: '#1b4c70' }} type="submit">
											Criar atividade
										</Button>
									</SheetClose>
								</SheetFooter>
							</form>
						</Form>
					</C.ContainerScroll>
				</SheetContent>
			</Sheet>
		</C.Container>
	);
};
