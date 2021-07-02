create database poke_api;

create table pokemons
(
    id          bigint auto_increment,
    name        varchar(100) not null,
    description varchar(255) not null,
    image_url   varchar(255) not null,
    date        date         null,
    released    tinyint(1)   null,
    type        varchar(25)  not null,
    category    varchar(50)  not null,
    constraint pokemons_id_uindex
        unique (id)
);

alter table pokemons
    add primary key (id);

create table users
(
    id        bigint auto_increment,
    name      varchar(50)  not null,
    last_name varchar(50)  not null,
    email     varchar(50)  not null,
    is_admin  tinyint(1)   not null,
    password  varchar(200) not null,
    constraint users_email_uindex
        unique (email),
    constraint users_id_uindex
        unique (id)
);

alter table users
    add primary key (id);

create table user_pokemons
(
    id         bigint auto_increment,
    user_id    bigint not null,
    pokemon_id bigint not null,
    constraint user_pokemons_id_uindex
        unique (id),
    constraint user_pokemons_pokemon_id_fk
        foreign key (pokemon_id) references pokemons (id)
            on delete cascade,
    constraint user_pokemons_user_id_fk
        foreign key (user_id) references users (id)
            on delete cascade
);

alter table user_pokemons
    add primary key (id);

INSERT INTO poke_api.users (name, last_name, email, is_admin, password) VALUES ('Luis', 'Figueroa', 'luis@gmail2.com', 0, '$2a$10$TJMjZDj73u0SPpmYhI/BXeylthLnsL18VJBO4vhgdCRreqEnqai2K')
