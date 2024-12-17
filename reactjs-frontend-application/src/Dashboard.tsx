import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from '@headlessui/react';
import {
    Bars3Icon,
    BellIcon,
    Cog6ToothIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import RegisterPersonDetails from './DashboardComponents/RegisterPersonDetails';
import i18n, { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeContext'; // Import the useTheme hook
import { MdLightMode, MdModeNight } from "react-icons/md";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import CreateTask from './DashboardComponents/CreateTask';
import AssignedTasks from './DashboardComponents/AssignedTask';
import TaskList from './DashboardComponents/TaskList';
import "react-modern-drawer/dist/index.css";
import Cookies from 'js-cookie';
import UserFormUpload from './DashboardComponents/UserFormUpload';
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import UserDetails from './DashboardComponents/UserDetails';


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeNav, setActiveNav] = useState<string>(); // Track active navigation
    const [activeNavName, setActiveNavName] = useState<string>('Projectss'); // Track the name of the active nav
    const { t }: { t: (key: keyof typeof import('./locales/en/translation.json')) => string } = useTranslation();
    const navigation = [
        { name: t('create_task'), icon: FolderIcon },
        { name: t('userUpload'), icon: HomeIcon },
        { name: t('userDetails'), icon: UsersIcon },
        { name: t('assigned_task'), icon: FolderIcon },
        { name: t('employee_Status'), icon: FolderIcon },
    ];

    const handleNavClick = (name: string) => {
        setActiveNav(name);
        setActiveNavName(name); // Update the active nav name when clicked
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        Cookies.remove('role');
        Cookies.remove('accessToken')
        localStorage.getItem('username')
        navigate("/");
    };
    const [isUser, setIsUser] = useState(false)
    const onclickDrawer = () => {
        setIsUser((prevState) => !prevState);
    };
    const userNavigation = [
        {name: t('profile') ,onClick: onclickDrawer },
        { name: t('logout'), onClick: handleLogout },
    ];

    const detail = localStorage.getItem('username');

const userData: string | undefined = Cookies.get('userData')
let decodedUserData;
if (userData) {
    // Decode and parse the cookie value
     decodedUserData = JSON.parse(decodeURIComponent(userData));  // Safe to parse now
    console.log(decodedUserData);  // Now you can safely use it
  } 
    

    const { theme, toggleTheme } = useTheme(); // Get the theme and the toggle function

    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const isManager = Cookies.get('role') === 'ROLE_MANAGER'
    const isAdmin = Cookies.get('role') === 'ROLE_ADMIN'
    const isEmployee = Cookies.get('role') === 'ROLE_EMPLOYEE'

    const changeLanguage = (languageCode: string) => {
        setSelectedLanguage(languageCode);
        i18n.changeLanguage(languageCode);
        if (isAdmin) {
            setActiveNav(t('userUpload'))
            setActiveNavName(t('userUpload'))
        }
        else if (isManager) {
            setActiveNav(t('create_task'))
            setActiveNavName(t('create_task'))
        }
        else if (isEmployee) {
            setActiveNav(t('assigned_task'))
            setActiveNavName(t('assigned_task'))
        }
    };



    useEffect(() => {
        if (isAdmin) {
            setActiveNav(t('userUpload'))
            setActiveNavName(t('userUpload'))
        }
        else if (isManager) {
            setActiveNav(t('create_task'))
            setActiveNavName(t('create_task'))
        }
        else if (isEmployee) {
            setActiveNav(t('assigned_task'))
            setActiveNavName(t('assigned_task'))
        }
    }, [])
    const filteredSideBarTopics = navigation.filter((topic) => {
        if (isAdmin) {
            return topic.name !== t('assigned_task') && topic.name !== t('create_task');
        }
        else if (isEmployee) {
            return topic.name === t('assigned_task');
        }
        else if (isManager) {
            return topic.name !== t('userUpload') && topic.name !== t('userDetails') && topic.name !== t('assigned_task');
        }
        return true; // Show all topics if manager
    });

    return (
        <>
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(false)}
                                    className="-m-2.5 p-2.5"
                                >
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul role="list" className="-mx-2 space-y-1">
                                            {filteredSideBarTopics.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        onClick={() => handleNavClick(item.name)} // Set active nav when clicked
                                                        className={classNames(
                                                            item.name === activeNav
                                                                ? 'bg-blue-600 text-white' // Active color
                                                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                        )}
                                                    >
                                                        <item.icon aria-hidden="true" className="size-6 shrink-0" />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="mt-auto">
                                        <a
                                            href="#"
                                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                        >
                                            <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                                            Settings
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                    <div className="flex h-12 shrink-0 items-center">
                        {/* <img
                            alt="Your Company"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                            className="h-8 w-auto"
                        /> */}
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {filteredSideBarTopics.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                onClick={() => handleNavClick(item.name)} // Set active nav when clicked
                                                className={classNames(
                                                    item.name === activeNav
                                                        ? 'bg-blue-600 text-white' // Active color
                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                )}
                                            >
                                                <item.icon aria-hidden="true" className="size-6 shrink-0" />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="mt-auto cursor-pointer">
                                <Link
                                    to='/'
                                    onClick={handleLogout}
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                >
                                    <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                                    {t('sign_out')}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-72">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>

                    <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 bg-white dark:bg-black">
                        <form action="#" method="GET" className="grid flex-1 grid-cols-1">
                            <MagnifyingGlassIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400 hidden"
                            />
                        </form>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="size-6" />
                            </button>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-md items-center bg-gray-200 dark:bg-gray-500"
                            >
                                {theme === 'light' ? <MdLightMode /> : <MdModeNight />}
                            </button>

                            <Select value={selectedLanguage} onValueChange={changeLanguage}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en" onClick={() => changeLanguage('en')}>English</SelectItem>
                                    <SelectItem value="de" onClick={() => changeLanguage('de')}>French</SelectItem>
                                </SelectContent>
                            </Select>
                            <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />
                            <div className="m-auto max-w-7xl px-4">

                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <div>
                                            <div className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <Avatar>
                                                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                                    <AvatarFallback className='p-3 bg-gray-200 text-xl'>{detail?.charAt(0)}</AvatarFallback>
                                                </Avatar>

                                            </div>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-44  bg-white dark:bg-gray-700 z-50 mt-3">
                                        <div className="bg-primary w-full h-1"></div>
                                        <div className="flex justify-center mt-4">
                                            <Avatar>
                                                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                                                <AvatarFallback className='p-3 bg-gray-200 text-xl'>{detail?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <p className="capitalize text-sm text-black dark:text-white text-center mt-2">
                                            {t('hi')}       {detail?.split("@")[0].replace(/\./g, " ")}
                                        </p>
                                        <hr className="mt-4" />
                                        {userNavigation.map((item) => (
                                            <div key={item.name}>
                                                <DropdownMenuItem
                                                    onClick={item.onClick}
                                                    className="cursor-pointer block px-4 py-2 text-xs text-black data-[focus]:bg-gray-100 dark:text-white leading-4 hover:bg-gray-200"
                                                >
                                                    {item.name}
                                                </DropdownMenuItem>
                                            </div>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-full w-full p-16'>
                    {activeNavName === t('create_task') && <CreateTask />}
                    {activeNavName === t('userUpload') && <UserFormUpload />}
                    {activeNavName === t('userDetails') && <RegisterPersonDetails />}
                    {activeNavName === t('assigned_task') && <AssignedTasks />}
                    {activeNavName === t('employee_Status') && <TaskList />}
                </div>

                <Drawer
        open={isUser}
        onClose={onclickDrawer}
        direction="right"
        className="w-3/4"
        size="50vw"
        lockBackgroundScroll={true}
      >
        <UserDetails onClickDrawer={onclickDrawer} details={decodedUserData} />
      </Drawer>
            </div>
        </>
    );
}
