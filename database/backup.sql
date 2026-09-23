--
-- PostgreSQL database dump
--

\restrict NqsdboeL6Crnq6eQdbkRti1sm44fG8Fft8mHN9tCPTiAkSA7dOw1SVbotCftprf

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    full_name character varying(100),
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, full_name, is_active, created_at, updated_at) FROM stdin;
4	admin	admin@adhivasindo.co.id	$2b$10$AD4ZlBIBhTAkqG1o87hcdeIgJ8aD28SO2B1V4HU2neSfDaUi5rWl6	Administrator	t	2026-09-23 14:04:58.648374	2026-09-23 14:04:58.648374
5	Percobaan	percobaan@mail.com	$2b$10$BqPYK6915B4WT1inI/Whv.88guTv5eLD5qgv9fFRq2qpJJmTr13Wq	Percobaan Pertama	t	2026-09-23 14:17:30.02503	2026-09-23 14:17:30.02503
7	budi	budi@adhivasindo.co.id	$2b$10$AD4ZlBIBhTAkqG1o87hcdeIgJ8aD28SO2B1V4HU2neSfDaUi5rWl6	Budi Santoso	t	2026-09-23 14:26:15.736404	2026-09-23 14:26:15.736404
8	siti	siti@adhivasindo.co.id	$2b$10$AD4ZlBIBhTAkqG1o87hcdeIgJ8aD28SO2B1V4HU2neSfDaUi5rWl6	Siti Aminah	t	2026-09-23 14:26:15.736404	2026-09-23 14:26:15.736404
9	andi	andi@adhivasindo.co.id	$2b$10$AD4ZlBIBhTAkqG1o87hcdeIgJ8aD28SO2B1V4HU2neSfDaUi5rWl6	Andi Pratama	t	2026-09-23 14:26:15.736404	2026-09-23 14:26:15.736404
10	dewi	dewi@adhivasindo.co.id	$2b$10$AD4ZlBIBhTAkqG1o87hcdeIgJ8aD28SO2B1V4HU2neSfDaUi5rWl6	Dewi Lestari	t	2026-09-23 14:26:15.736404	2026-09-23 14:26:15.736404
13	fajar	fajar@adhivasindo.co.id	$2b$10$AD4ZlBIBhTAkqG1o87hcdeIgJ8aD28SO2B1V4HU2neSfDaUi5rWl6	Fajar Nugroho	t	2026-09-23 14:26:15.736404	2026-09-23 14:26:15.736404
14	maya	maya@adhivasindo.co.id	$2b$10$AD4ZlBIBhTAkqG1o87hcdeIgJ8aD28SO2B1V4HU2neSfDaUi5rWl6	Maya Sari	t	2026-09-23 14:26:15.736404	2026-09-23 14:26:15.736404
15	hendra	hendra@adhivasindo.co.id	$2b$10$AD4ZlBIBhTAkqG1o87hcdeIgJ8aD28SO2B1V4HU2neSfDaUi5rWl6	Hendra Wijaya	f	2026-09-23 14:26:15.736404	2026-09-23 14:26:15.736404
11	Id 11 Terubah	sebelas@gmail.com	$2b$10$nEvf/AHXmeWNsEval22EEOHRbvAQE8a1d2dRvcNZwsIhoDdcT4NwG	sebelasterubah	t	2026-09-23 14:26:15.736404	2026-09-23 14:27:55.420719
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 15, true);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: idx_users_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_username ON public.users USING btree (username);


--
-- PostgreSQL database dump complete
--

\unrestrict NqsdboeL6Crnq6eQdbkRti1sm44fG8Fft8mHN9tCPTiAkSA7dOw1SVbotCftprf

