'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {fetchAddItem, fetchDeleteItem, fetchUpdateItem, fetchWatchList} from '@/app/api/watchlist';
import {WatchList, WatchListBlock, WatchListItem} from '@/types/WatchList';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneIcon from '@mui/icons-material/Done';
import CachedIcon from '@mui/icons-material/Cached';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const emptyBlocks: WatchListBlock = {
    wish: [],
    in_progress: [],
    done: [],
};

const Page = () => {
    const [blocks, setBlocks] = useState<WatchListBlock>(emptyBlocks);
    const [isBlockVisible, setIsBlockVisible] = useState({
        wish: true,
        in_progress: true,
        done: true,
    });
    const [isAdding, setIsAdding] = useState(false);
    const [sortMethod, setSortMethod] = useState<"asc" | "desc" | "time" | "type_asc" | "type_desc">("time");
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState<"wish" | "in_progress" | "done">('wish');

    const loadWatchList = useCallback(async () => {
        try {
            const items: WatchList = await fetchWatchList();
            setSortMethod(localStorage.getItem("sort") as "asc" | "desc" | "time" | "type_asc" | "type_desc")
            const grouped = items.reduce<WatchListBlock>(
                (acc, item) => {
                    acc[item.status].push(item);
                    return acc;
                },
                { wish: [], in_progress: [], done: [] }
            );
            setBlocks(sort(grouped));
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        loadWatchList();
    }, [loadWatchList]);

    useEffect(() => {
        setBlocks(prev => sort(prev));
    }, [sortMethod]);


    const sort = (grouped: WatchListBlock): WatchListBlock => {
        const copy = {
            wish: [...grouped.wish],
            in_progress: [...grouped.in_progress],
            done: [...grouped.done],
        };

        switch (sortMethod) {
            case "asc":
                copy.wish.sort((a, b) => a.name.localeCompare(b.name));
                copy.in_progress.sort((a, b) => a.name.localeCompare(b.name));
                copy.done.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "desc":
                copy.wish.sort((a, b) => b.name.localeCompare(a.name));
                copy.in_progress.sort((a, b) => b.name.localeCompare(a.name));
                copy.done.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "type_asc":
                copy.wish.sort((a, b) => a.type.localeCompare(b.type));
                copy.in_progress.sort((a, b) => a.type.localeCompare(b.type));
                copy.done.sort((a, b) => a.type.localeCompare(b.type));
                break;
            case "type_desc":
                copy.wish.sort((a, b) => b.type.localeCompare(a.type));
                copy.in_progress.sort((a, b) => b.type.localeCompare(a.type));
                copy.done.sort((a, b) => b.type.localeCompare(a.type));
                break;
            case "time":
            default:
                copy.wish.sort((a, b) => b.created_at - a.created_at);
                copy.in_progress.sort((a, b) => b.created_at - a.created_at);
                copy.done.sort((a, b) => b.created_at - a.created_at);
                break;
        }

        return copy;
    };


    const addItem = async () => {
        if (!name || !type) return;

        try {
            await fetchAddItem({ name, type, status });
            setName('');
            setType('');
            setStatus('wish');
            setIsAdding(false);
            loadWatchList();
        } catch (error) {
            console.error(error);
        }
    };

    const editItem = async (id: string, changes: Partial<WatchListItem>) => {
        try {
            await fetchUpdateItem(id, changes);
            loadWatchList();
        } catch (error) {
            console.error(error);
        }
    };


    const deleteItem = async (id: string) => {
        try {
            await fetchDeleteItem(id);
            loadWatchList();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        localStorage.setItem("sort", event.target.value);
        setSortMethod(event.target.value as "asc" | "desc" | "time" | "type_asc" | "type_desc");
    };


    const close = () => {
        setName('');
        setType('');
        setIsAdding(false);
    };

    const renderBlock = (title: string, items: WatchList, block: "wish" | "in_progress" | "done") => (
        <div className="mt-6 w-full max-w-3xl p-4 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold">{title}</p>
                {
                    isBlockVisible[block] ? (
                        <KeyboardArrowDownIcon
                            className="cursor-pointer transition-transform duration-200 active:scale-95 hover:scale-115"
                            onClick={() =>
                                setIsBlockVisible(prevState => ({
                                    ...prevState,
                                    [block]: false,
                                }))
                            }/>
                    ) : (
                        <KeyboardArrowUpIcon
                            className="cursor-pointer transition-transform duration-200 active:scale-95 hover:scale-115"
                            onClick={() =>
                                setIsBlockVisible(prevState => ({
                                    ...prevState,
                                    [block]: true,
                                }))
                            }/>
                    )
                }
            </div>
            <p className="text-gray-500 mb-2">{items.length} в списке</p>
            <ul
                className={`space-y-1
                            overflow-hidden
                            transition-all duration-300 ease-in-out
                            ${isBlockVisible[block]
                                            ? 'max-h-auto opacity-100 scale-100'
                                            : 'max-h-0 opacity-0 scale-95'
                                        }
                            `}
            >
                {items.map((item) => (
                    <li key={item._id} className="text-lg flex justify-between" >
                        <div>
                            {item.name}, {item.type.toLowerCase()}
                        </div>
                        <div className="flex gap-3">
                            {
                                block !== "done" && (
                                    <>
                                        <DoneIcon className="cursor-pointer transition-transform duration-200 active:scale-95 hover:scale-115" onClick={() => editItem(item._id, {status: 'done'})} />
                                    </>
                                )
                            }
                            {
                                block === "wish" && (
                                    <>
                                        <VisibilityIcon className="cursor-pointer transition-transform duration-200 active:scale-95 hover:scale-115" onClick={() => editItem(item._id, {status: 'in_progress'})} />
                                    </>
                                )
                            }
                            {
                                block === "done" && (
                                    <>
                                        <CachedIcon className="cursor-pointer transition-transform duration-200 active:scale-95 hover:scale-115" onClick={() => editItem(item._id, {status: 'wish'})} />
                                    </>
                                )
                            }
                            <DeleteOutlineIcon className="cursor-pointer transition-transform duration-200 active:scale-95 hover:scale-115" onClick={() => deleteItem(item._id)}/>
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    );

    return (
        <div className="flex flex-col items-center min-h-[calc(100vh-72px)] px-4 py-6">
            {!isAdding ? (
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => setIsAdding(true)}
                        className="text-xl font-medium cursor-pointer hover:text-pink-700 transition"
                    >
                        + Добавить
                    </button>

                    <Select
                        value={sortMethod}
                        onChange={handleSortChange}
                        size="small"
                        className="bg-white rounded-md"
                    >
                        <MenuItem className="bg-red-400" value="time">Сначала новые</MenuItem>
                        <MenuItem value="asc">По названию (A–Z)</MenuItem>
                        <MenuItem value="desc">По названию (Z–A)</MenuItem>
                        <MenuItem value="type_asc">По типу (A–Z)</MenuItem>
                        <MenuItem value="type_desc">По типу (Z–A)</MenuItem>
                    </Select>
                </div>

            ) : (
                <div className="flex flex-wrap gap-3 mb-6">
                    <input
                        className="p-2 border rounded-md text-lg w-64"
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        placeholder="Название"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Select
                        value={type}
                        displayEmpty
                        onChange={(e) => setType(e.target.value)}
                        className="w-48 bg-white"
                    >
                        <MenuItem value="" disabled>
                            Тип
                        </MenuItem>
                        <MenuItem value="Фильм">Фильм</MenuItem>
                        <MenuItem value="Мультфильм">Мультфильм</MenuItem>
                        <MenuItem value="Сериал">Сериал</MenuItem>
                        <MenuItem value="Аниме">Аниме</MenuItem>
                    </Select>

                    <Select
                        value={status}
                        displayEmpty
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-48 bg-white"
                    >
                        <MenuItem value="" disabled>
                            Статус
                        </MenuItem>
                        <MenuItem value="wish">Посмотреть в будущем</MenuItem>
                        <MenuItem value="in_progress">В процессе</MenuItem>
                        <MenuItem value="done">Просмотрено</MenuItem>
                    </Select>

                    <button
                        onClick={addItem}
                        className="px-4 py-2 bg-pink-600 text-white cursor-pointer rounded-md hover:bg-pink-700  transition"
                    >
                        Сохранить
                    </button>

                    <button
                        onClick={close}
                        className="px-4 py-2 border rounded-md cursor-pointer transition"
                    >
                        Отмена
                    </button>
                </div>
            )}

            {renderBlock('Посмотреть в будущем', blocks.wish, "wish")}
            {renderBlock('В процессе', blocks.in_progress, "in_progress")}
            {renderBlock('Просмотрено', blocks.done, "done")}
        </div>
    );
};

export default Page;
