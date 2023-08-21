create database managertasks;

create table if not exists users(
    id serial primary key,
    name text not null,
    email text not null unique,
    password text not null 
);

create table if not exists todos(
    id serial primary  key,
    task text not null,
    active boolean default true,
    data date not null default now(),
    user_id integer not null references users(id) 
);