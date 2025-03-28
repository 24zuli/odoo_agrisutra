--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3
-- Dumped by pg_dump version 17.4 (Homebrew)

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
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    booking_id integer NOT NULL,
    user_id integer NOT NULL,
    owner_id integer NOT NULL,
    equipment_id integer NOT NULL,
    booking_status character varying(50) DEFAULT 'Booked'::character varying,
    cost numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    start_date date NOT NULL,
    end_date date NOT NULL,
    CONSTRAINT bookings_booking_status_check CHECK (((booking_status)::text = ANY ((ARRAY['Booked'::character varying, 'Cancelled'::character varying, 'Completed'::character varying])::text[]))),
    CONSTRAINT bookings_cost_check CHECK ((cost >= (0)::numeric))
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_booking_id_seq OWNER TO postgres;

--
-- Name: bookings_booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_booking_id_seq OWNED BY public.bookings.booking_id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_category_id_seq OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- Name: crops; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crops (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL
);


ALTER TABLE public.crops OWNER TO postgres;

--
-- Name: crops_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.crops_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.crops_id_seq OWNER TO postgres;

--
-- Name: crops_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.crops_id_seq OWNED BY public.crops.id;


--
-- Name: equipment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipment (
    equipment_id integer NOT NULL,
    category_id integer,
    owner_id integer NOT NULL,
    no_of_units integer DEFAULT 1,
    location_lat numeric(10,8),
    location_lng numeric(11,8),
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    available_from timestamp without time zone,
    available_to timestamp without time zone,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    location text,
    availability character varying(50) DEFAULT 'Available Now'::character varying,
    phone_number character varying(20),
    CONSTRAINT equipment_availability_check CHECK (((availability)::text = ANY ((ARRAY['Available Now'::character varying, 'Not Available'::character varying])::text[]))),
    CONSTRAINT equipment_price_check CHECK ((price >= (0)::numeric))
);


ALTER TABLE public.equipment OWNER TO postgres;

--
-- Name: equipment_equipment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.equipment_equipment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.equipment_equipment_id_seq OWNER TO postgres;

--
-- Name: equipment_equipment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.equipment_equipment_id_seq OWNED BY public.equipment.equipment_id;


--
-- Name: saved_schemes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_schemes (
    id integer NOT NULL,
    user_id integer,
    scheme_id integer,
    saved_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.saved_schemes OWNER TO postgres;

--
-- Name: saved_schemes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.saved_schemes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.saved_schemes_id_seq OWNER TO postgres;

--
-- Name: saved_schemes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.saved_schemes_id_seq OWNED BY public.saved_schemes.id;


--
-- Name: schemes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schemes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    details text,
    benefits text[],
    eligibility text[],
    youtube_link text,
    registration_link text,
    date date
);


ALTER TABLE public.schemes OWNER TO postgres;

--
-- Name: schemes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schemes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.schemes_id_seq OWNER TO postgres;

--
-- Name: schemes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schemes_id_seq OWNED BY public.schemes.id;


--
-- Name: uploads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uploads (
    id integer NOT NULL,
    user_id integer,
    filename text NOT NULL,
    filepath text NOT NULL,
    uploaded_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.uploads OWNER TO postgres;

--
-- Name: uploads_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uploads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.uploads_id_seq OWNER TO postgres;

--
-- Name: uploads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uploads_id_seq OWNED BY public.uploads.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    gender character varying(20),
    date_of_birth date,
    state character varying(100) DEFAULT 'Gujarat'::character varying,
    district character varying(100),
    phone_number character varying(15),
    profile_completed boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    location_lat numeric(9,6),
    location_lng numeric(9,6),
    role character varying(50) DEFAULT 'seeker'::character varying
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
-- Name: bookings booking_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN booking_id SET DEFAULT nextval('public.bookings_booking_id_seq'::regclass);


--
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- Name: crops id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crops ALTER COLUMN id SET DEFAULT nextval('public.crops_id_seq'::regclass);


--
-- Name: equipment equipment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipment ALTER COLUMN equipment_id SET DEFAULT nextval('public.equipment_equipment_id_seq'::regclass);


--
-- Name: saved_schemes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_schemes ALTER COLUMN id SET DEFAULT nextval('public.saved_schemes_id_seq'::regclass);


--
-- Name: schemes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schemes ALTER COLUMN id SET DEFAULT nextval('public.schemes_id_seq'::regclass);


--
-- Name: uploads id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uploads ALTER COLUMN id SET DEFAULT nextval('public.uploads_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (booking_id, user_id, owner_id, equipment_id, booking_status, cost, created_at, start_date, end_date) FROM stdin;
1	30	30	9	Booked	900.00	2025-03-15 16:59:58.193742	2025-03-15	2025-03-16
2	31	31	10	Booked	123.00	2025-03-28 13:57:51.367826	2025-03-29	2025-03-07
3	31	1	5	Booked	800.00	2025-03-28 13:59:29.917172	2025-03-28	2025-03-29
4	31	3	1	Booked	2000.00	2025-03-28 16:07:05.854946	2025-03-29	2025-03-30
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (category_id, name, description, created_at, updated_at) FROM stdin;
1	Tractor	\N	2025-03-02 02:30:39.930216	2025-03-02 02:30:39.930216
2	Thresher	\N	2025-03-02 02:30:39.930216	2025-03-02 02:30:39.930216
3	Plow	\N	2025-03-02 02:30:39.930216	2025-03-02 02:30:39.930216
4	Sprayer	\N	2025-03-02 02:30:39.930216	2025-03-02 02:30:39.930216
\.


--
-- Data for Name: crops; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.crops (id, name, description) FROM stdin;
1	rice	Rice is ideal for your region because it thrives in high temperatures (above 25°C), high humidity, and ample rainfall or irrigation. It grows well in clayey soil with good water retention and can adapt to both acidic and alkaline soils. Rice is a highly nutritious staple crop, rich in Vitamins A, B, and Calcium. It is also in high demand globally, making it a profitable choice. If your region has good irrigation and labor availability, rice is a great option for cultivation.
2	maize	Maize is recommended for your region because it is a versatile crop that adapts well to varied temperatures (20-30°C) and moderate rainfall (50-100 cm). It grows best in well-drained loamy soil with a pH range of 5.5 to 7.5. Maize is a high-yielding cereal crop, rich in carbohydrates, proteins, and essential nutrients, making it a valuable food, fodder, and industrial crop. Its ability to grow in both rainfed and irrigated conditions makes it a profitable and sustainable choice for farmers.
3	jute	Jute is recommended for your region because it thrives in warm and humid climates, requiring temperatures between 24-35°C and high rainfall (150-250 cm). It grows best in well-drained alluvial or loamy soil with a pH of 5.0-7.5. Jute is a high-yielding, eco-friendly fiber crop used for making sacks, ropes, and textiles. Its ability to grow in flood-prone and water-retentive soils makes it ideal for cultivation in river basins and monsoon-fed regions. Additionally, jute enriches the soil and supports sustainable farming practices.
4	cotton	Cotton is recommended for your region because it grows best in warm climates with temperatures between 25-35°C and requires moderate rainfall (50-100 cm), supplemented by irrigation in drier areas. It thrives in well-drained black soil (Regur soil) and sandy loam with a pH of 5.5-8.5. Cotton is a long-duration crop and requires a frost-free growing period of 180-200 days. It is a key cash crop used in the textile industry, producing fiber for fabrics, oil from its seeds, and cattle feed. Its adaptability to different soil types and high economic value make it a profitable choice for farmers.
5	coconut	Coconut is suitable for your region due to stable temperatures and sufficient rainfall. The climate conditions ensure steady growth, making it a viable crop for long-term cultivation. Additionally, coconut trees provide multiple products, such as oil, fiber, and water, adding economic value.
6	papaya	Papaya is recommended due to its ability to thrive in warm climates with moderate rainfall. Your region's temperature range ensures optimal growth. As a fast-growing fruit crop rich in vitamins, papaya is both nutritious and commercially valuable.
7	apple	Apples are a highly nutritious fruit, rich in antioxidants, fiber, and essential vitamins. They require a temperate climate with cold winters (0°C to 7°C) for proper dormancy and warm summers (21°C to 24°C) for fruit development. Well-drained, loamy soils with good organic content and moderate rainfall (100-125 cm) are ideal for apple cultivation. Climate change impacts apple production, affecting flowering, fruit set, and yield. Proper orchard management, including irrigation and pest control, ensures quality production. Apples hold significant economic value and are widely cultivated in India's Himalayan regions.
8	muskmelon	Muskmelon is a highly nutritious fruit, rich in vitamins A and C, antioxidants, and hydration properties. It thrives in warm climates with temperatures between 25°C to 35°C and requires well-drained sandy loam soil with a pH of 6.0 to 7.5. The crop needs moderate rainfall (50-75 cm) and benefits from drip irrigation to maintain optimal soil moisture.
9	watermelon	Watermelon is a highly refreshing and nutritious fruit, rich in vitamins A, C, and antioxidants, making it a great choice for consumption. It thrives in warm temperatures (25°C - 30°C) and requires well-drained sandy or loamy soil with a pH of 6.0 - 6.8. Watermelon is a drought-tolerant crop but needs moderate and consistent watering, especially during flowering and fruit development.
10	grapes	Grapes are a high-value fruit crop known for their nutritional benefits, rich in vitamins C, K, and antioxidants. They grow best in warm, dry climates with temperatures ranging from 15°C to 35°C. Grapes require moderate rainfall (50-75 cm) and well-drained loamy or sandy soil with a pH of 6.5 - 7.5.
11	mango	Mango, known as the "King of Fruits," thrives in warm tropical and subtropical climates with temperatures between 24°C to 30°C. It requires moderate rainfall (75-250 cm) but can tolerate dry conditions. The crop grows best in well-drained loamy soil with a pH range of 5.5 to 7.5.
12	banana	Banana is a tropical fruit crop that thrives in warm and humid climates, with an optimal temperature range of 26°C to 30°C. It requires high humidity and annual rainfall between 1,200 mm to 2,500 mm, though it can also be grown under irrigated conditions.
13	pomegranate	Pomegranate thrives in semi-arid and subtropical climates, making it ideal for regions with hot, dry summers and cool winters. It grows best in temperatures ranging from 25°C to 35°C and requires low to moderate rainfall (500-800 mm annually).
14	lentil	Lentils are highly adaptable to semi-arid and temperate climates, making them ideal for cultivation in regions with moderate rainfall (300-450 mm) and temperatures between 18°C and 30°C.
15	blackgram	Black gram (Urad dal) is a drought-tolerant legume that thrives in warm climates with temperatures between 25°C and 35°C and moderate rainfall (600-800 mm).
16	mungbeans	Mung bean is a climate-resilient legume that thrives in warm temperatures (25°C–35°C) with moderate rainfall (600–800 mm).
17	chickpeas	Chickpeas thrive in cool-season climates, with an optimal temperature range of 15°C–25°C during their growing period.
18	coffee	Coffee thrives in tropical climates with temperatures between 18°C–24°C and moderate rainfall of 1200–2200 mm annually.
19	mothbeans	Moth bean is a drought-resistant legume that thrives in arid and semi-arid regions with low rainfall (250–500 mm) and high temperatures (25°C–35°C). It grows well in light sandy or loamy soils with a pH range of 6.5–7.5, making it ideal for dryland farming. As a nitrogen-fixing crop, it enhances soil fertility and is suitable for crop rotation. Moth bean is highly tolerant to water scarcity and poor soil conditions, making it an excellent choice for regions with limited irrigation. Additionally, it is a nutritious pulse crop, rich in protein and fiber.
20	pigeonbeans	Pigeon peas are suited for your region due to their drought tolerance and ability to improve soil fertility. They are a high-protein legume, making them a valuable crop for both food security and market sales.
21	kidneybeans	Kidney beans thrive in cool to moderate temperatures (15°C–25°C) and require well-drained loamy or sandy soils with a pH of 6.0–7.0. They need moderate rainfall (300–600 mm) or controlled irrigation, as excessive water can cause root rot. This legume is highly nutritious, rich in protein, fiber, and essential minerals, making it a valuable dietary staple. Additionally, kidney beans enhance soil fertility by fixing atmospheric nitrogen, benefiting subsequent crops. They are best suited for crop rotation and sustainable farming practices.
\.


--
-- Data for Name: equipment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipment (equipment_id, category_id, owner_id, no_of_units, location_lat, location_lng, name, description, price, available_from, available_to, created_at, updated_at, location, availability, phone_number) FROM stdin;
2	1	4	1	\N	\N	Mahindra 575 DI	45 HP Tractor with 4WD capability	1800.00	2025-03-05 00:00:00	2025-03-15 00:00:00	2025-03-02 02:32:56.722553	2025-03-02 02:32:56.722553	Surat, Gujarat	Available Now	9871122334
3	2	4	1	\N	\N	AXE Multi-Crop Thresher	Suitable for wheat, paddy, and pulses	1500.00	2025-03-02 00:00:00	2025-03-12 00:00:00	2025-03-02 02:32:56.722553	2025-03-02 02:32:56.722553	Rajkot, Gujarat	Available Now	9632587412
4	2	4	1	\N	\N	Dasmesh 641 Thresher	Powerful thresher with 30-50 HP range	1600.00	2025-03-07 00:00:00	2025-03-17 00:00:00	2025-03-02 02:32:56.722553	2025-03-02 02:32:56.722553	Mumbai, Maharashtra	Available Now	9123456789
6	3	2	1	\N	\N	Mahindra Reversible Plow	Hydraulic reversible plow for better efficiency	900.00	2025-03-09 00:00:00	2025-03-19 00:00:00	2025-03-02 02:32:56.722553	2025-03-02 02:32:56.722553	Anand, Gujarat	Available Now	8754123698
7	4	1	1	\N	\N	KisanKraft Battery Sprayer	15-liter battery-powered sprayer	500.00	2025-03-05 00:00:00	2025-03-14 00:00:00	2025-03-02 02:32:56.722553	2025-03-02 02:32:56.722553	Vadodara, Gujarat	Available Now	9512364785
8	4	2	1	\N	\N	Usha Agro Knapsack Sprayer	Hand-operated sprayer for small farms	550.00	2025-03-08 00:00:00	2025-03-18 00:00:00	2025-03-02 02:32:56.722553	2025-03-02 02:32:56.722553	Bhavnagar, Gujarat	Available Now	7854123698
9	1	30	1	\N	\N	Zuli 	knnkj	900.00	\N	\N	2025-03-15 16:59:41.544882	2025-03-15 16:59:41.544882	surat	Not Available	8668754563
10	1	31	1	\N	\N	zjd	xdfghjkljhg	123.00	\N	\N	2025-03-28 13:57:25.118927	2025-03-28 13:57:25.118927	surat	Not Available	1334455234
5	3	1	1	\N	\N	Fieldking Disc Plow	3-disc plow suitable for large fields	800.00	2025-03-03 00:00:00	2025-03-08 00:00:00	2025-03-02 02:32:56.722553	2025-03-02 02:32:56.722553	Gandhinagar, Gujarat	Not Available	8901234567
1	1	3	1	\N	\N	John Deere 5050D	50 HP Tractor with 3-cylinder engine	2000.00	2025-03-01 00:00:00	2025-03-10 00:00:00	2025-03-02 02:32:56.722553	2025-03-02 02:32:56.722553	Ahmedabad, Gujarat	Not Available	9876543210
\.


--
-- Data for Name: saved_schemes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_schemes (id, user_id, scheme_id, saved_at) FROM stdin;
1	2	1	2025-03-01 17:18:35.716015
2	2	1	2025-03-01 17:22:41.89291
3	2	1	2025-03-01 17:23:59.149316
4	2	1	2025-03-01 17:26:03.831621
5	2	1	2025-03-01 17:26:43.303955
6	2	1	2025-03-01 17:30:25.437056
7	2	1	2025-03-01 17:38:31.276159
8	2	1	2025-03-01 17:38:58.53442
9	2	1	2025-03-01 17:39:03.243386
10	2	1	2025-03-01 18:32:26.375259
11	2	2	2025-03-01 19:15:55.968729
12	5	1	2025-03-02 00:39:06.071823
\.


--
-- Data for Name: schemes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schemes (id, name, description, details, benefits, eligibility, youtube_link, registration_link, date) FROM stdin;
1	National Mission on Natural Farming (NMNF)	A standalone scheme to motivate farmers to adopt chemical-free farming by up scaling the Bhartiya Prakritik Krishi Paddati (BPKP) for the duration 2023-2026.	Launched in November 2024, the National Mission on Natural Farming (NMNF) is a Centrally Sponsored Scheme under the Ministry of Agriculture & Farmers’ Welfare. The scheme promotes Natural Farming—a method based on desi cow and locally available resources that completely avoids chemical fertilizers and pesticides. It emphasizes traditional indigenous practices such as on-farm biomass recycling, use of desi cow dung-urine formulations, pest management through botanical concoctions, and exclusion of synthetic chemical inputs. The mission aims to reduce farmers’ dependency on externally purchased inputs, lower production costs, and ultimately increase farmer incomes. It also focuses on popularizing integrated agriculture-animal husbandry models, documenting and scaling up existing Natural Farming practices, creating awareness and capacity building, and establishing standards, certification procedures, and branding for Natural Farming products both nationally and internationally.	{"NMNF will be implemented in 15,000 clusters in Gram Panchayats, reaching 1 crore farmers and covering 7.5 lakh Ha area.","Preference will be given to areas with existing Natural Farming practices, SRLM/PACS/FPOs presence.","Set-up of 10,000 need-based Bio-input Resource Centres (BRCs) for ready-to-use NF inputs.","Financial assistance for on-farm manure production infrastructure: Rs. 15000 per ha (Rs. 5000 per ha/year for three years).","Organization of 6 one-day village-level trainings for a batch of 50 farmers with a financial support of Rs. 30,000 per training batch.","Formation of Farmer Producer Organisations (FPOs): 100 in the Gangetic belt and 400 in the rest of the country.","Awareness creation through Farmer Field School (FFS) in the first year."}	{"The scheme is applicable to all farmers in India."}	https://www.youtube.com/watch?v=RNj5y0OWTEY&t=10s	https://naturalfarming.dac.gov.in/	2024-11-01
2	Animal Husbandry Infrastructure Development Fund (AHIDF)	A scheme under the Infrastructure Development Fund (IDF) with an outlay of Rs.29,610.25 crore to incentivize investments in dairy processing, meat processing, feed plants, breed multiplication farms, animal waste to wealth management, and veterinary vaccine/drug production, continued until 2025-26.	The Animal Husbandry Infrastructure Development Fund (AHIDF) is implemented under the Infrastructure Development Fund (IDF) with an outlay of Rs.29,610.25 crore and is to be continued until 2025-26. The scheme incentivizes investments in various sectors including dairy processing and product diversification, meat processing and product diversification, animal feed plants, breed multiplication farms, animal waste to wealth management (Agri-waste management), and veterinary vaccine and drug production facilities. Its objectives include increasing processing capacity and product diversification, ensuring quality products for domestic consumers, fulfilling the protein-enriched food requirements of the population, generating employment and promoting entrepreneurship, and boosting exports in the dairy and meat sectors. The scheme supports loan availability up to 90% of the project cost with an interest subvention of 3%, a credit guarantee fund of Rs.750 crore, no ceiling on loan amount, and a maximum repayment period of 8 years (inclusive of a 2-year moratorium). It also dovetails with other central and state schemes to maximize benefits for various farm activities.	{"Incentivizes investments in dairy processing and product diversification.","Incentivizes investments in meat processing and product diversification.","Supports investments in animal feed plants and breed multiplication farms.","Encourages animal waste to wealth management and veterinary vaccine/drug production.","Provides loan support up to 90% of the project cost with a 3% interest subvention.","Offers a credit guarantee fund of Rs.750 crore for eligible entities.","No ceiling on the loan amount with a repayment period of up to 8 years."}	{"Individual entrepreneurs.","Farmer Producer Organisations (FPOs).","Dairy Cooperatives.","Micro, Small and Medium Enterprises (MSMEs).","Section 8 companies.","Private companies."}	https://www.youtube.com/watch?v=Deb3xKBZmY4	https://ahidf.udyamimitra.in/	2020-06-24
3	Pradhan Mantri Kisan Maan Dhan Yojana (PM-KMY)	A social security scheme launched on 12.9.2019 to provide a guaranteed pension to Small and Marginal Farmers in their old age, managed by LIC.	Launched on 12.9.2019, the Pradhan Mantri Kisan Maan Dhan Yojana (PM-KMY) aims to offer financial security to Small and Marginal Farmers by providing a minimum assured pension upon reaching the age of 60. Under this scheme, each subscriber is guaranteed a minimum pension of Rs.3000 per month, and in the event of the subscriber’s demise, the spouse receives a family pension of Rs.1500 per month if they are not already a beneficiary. The scheme also allows farmers to voluntarily contribute their PM-KISAN benefits, with an equal contribution by the government through the Department of Agriculture Cooperation and Farmers Welfare. Monthly contributions range from Rs.55 to Rs.200 based on the age of the farmer at enrollment. The scheme outlines provisions for early exit and continuation of benefits in case of the subscriber’s death, with the remaining corpus returned to the fund upon the demise of both the subscriber and the spouse. Enrollment can be done through Common Service Centres (CSCs) or via an online portal.	{"Guaranteed minimum pension of Rs.3000 per month at age 60","Family pension of Rs.1500 per month for the spouse upon subscriber’s death","Option to use PM-KISAN benefits for voluntary contributions","Equal government contribution to the pension fund","Monthly contributions based on age ranging from Rs.55 to Rs.200"}	{"Small and Marginal Farmers owning cultivable land up to 2 hectares as per records dated 1st August 2019","Age between 18 and 40 years","Not covered under other social security schemes like NPS, ESI, PM-SYM, or PM-LVM","Excludes institutional land holders, former and current constitutional office holders, government employees, and tax-paying professionals"}	https://www.youtube.com/watch?v=_Yoo9u3L1e4	https://pmkmy.gov.in/	2019-09-12
4	Krishi UDAN Scheme (Krishi UDAN 2.0)	Launched in August 2020, the Krishi UDAN Scheme aims to assist farmers by providing seamless, cost-effective, and time-bound air transportation of agri-produce, thereby improving their value realisation.	Krishi UDAN Scheme was launched in August 2020 on international and national routes to assist farmers in transporting agricultural products. The scheme focuses on ensuring efficient air transportation and associated logistics for agri-produce, especially from Northeast, hilly, and tribal regions. Its objectives include increasing the share of air transportation in the modal mix for agricultural products, enhancing connectivity between origin-destination airports, and improving logistics efficiency through infrastructure upgrades. The scheme promotes convergence among various Central and State initiatives and private investments to develop sustainable agri-value chains. Under Krishi UDAN 2.0, full waivers on landing, parking, TNLC, and RNFC charges for selected freighters are provided, alongside the development of a hub and spoke model for cargo infrastructure at designated airports. The implementation plan includes an initial focus on 25 airports in targeted regions, later expanding to 53 airports nationwide with a phased timeline from 2021 to 2025. Additionally, a digital platform named E-KUSHAL is proposed to integrate information dissemination and coordination with the National Agriculture Market (e-NAM).	{"Ensures cost-effective and timely air transportation of agri-produce.","Improves value realisation for farmers through enhanced logistics.","Provides full waiver of landing, parking, TNLC, and RNFC charges at selected airports.","Strengthens cargo infrastructure with a hub and spoke model.","Facilitates digital integration via the E-KUSHAL platform for holistic agri-logistics."}	{"Targeted primarily at farmers and stakeholders from Northeast, hilly, and tribal regions.","Beneficiaries include freight forwarders and airlines involved in agri-produce transportation."}	https://www.youtube.com/watch?v=1X-w_cILyTs	https://sansad.in/getFile/annex/266/AU1456_FhLisi.pdf?source=pqars#:~:text=(a)%20The%20Krishi%20Udan%20Scheme,it%20improves%20their%20value%20realisation.	2020-08-01
5	Pradhan Mantri Krishi Sinchayee Yojana: Per Drop More Crop	Launched on 1st July 2015 by the Dept. of Agriculture & Farmers Welfare, this scheme aims to enhance water use efficiency at the farm level through micro irrigation and complementary water conservation measures.	The scheme “Pradhan Mantri Krishi Sinchayee Yojana: Per Drop More Crop” was launched by the Dept. of Agriculture & Farmers Welfare, Ministry of Agriculture & Farmers Welfare, Govt. of India on 1st July 2015. It mainly focuses on enhancing water use efficiency at the farm level through Micro Irrigation (Drip and Sprinkler Irrigation System) and supports micro-level water storage and water conservation/management activities to supplement source creation for Micro Irrigation. Objectives include increasing the area under micro irrigation, boosting crop productivity and farmer incomes through precision water management, promoting micro irrigation in water-intensive crops like sugarcane, banana, and cotton, facilitating fertigation, targeting water-scarce and stressed areas, linking tube-well/river-lift projects with micro irrigation, establishing synergy with other water programs, and creating employment opportunities for the installation and maintenance of micro irrigation systems. Important features include the dual focus on assured irrigation and protective irrigation via rainwater harvesting (Jal Sanchay and Jal Sinchan) and the implementation of four components: Accelerated Irrigation Benefit Programme (AIBP), Per Drop More Crop (PDMC), Har Khet Ko Pani, and Watershed Development. The scheme is implemented through designated nodal departments at the State level with flexibility for States to appoint dedicated agencies.	{"Financial assistance for the installation of micro irrigation systems, ensuring all water sources are linked to a micro irrigation setup.","Installation of drip or sprinkler irrigation systems in selected crop fields, either by the farmers themselves or through approved companies.","Assistance pattern: 55% for small and marginal farmers and 45% for other farmers, with cost-sharing ratios of 60:40 for most states, 90:10 for North Eastern and Himalayan states, and 100% by the Central Government for Union Territories.","Benefits are transferred directly to the farmer’s bank account via Direct Benefit Transfer (DBT).","Additional support for water harvesting structures, water lifting devices, and farm pond construction under Other Interventions."}	{"The applicant must be a citizen of India.","All farmers in the State and Union Territory are eligible.","The subsidy is limited to an overall ceiling of 5 hectares per beneficiary.","Beneficiaries must purchase only BIS-marked systems/components.","Implementation is via Direct Benefit Transfer (DBT), requiring Aadhaar details for benefit access."}	https://www.youtube.com/watch?v=PJFCHQyj-b4	https://pmksy.gov.in/	2015-07-01
\.


--
-- Data for Name: uploads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uploads (id, user_id, filename, filepath, uploaded_at) FROM stdin;
1	\N	1743158130679_sample_image.jpeg	/Users/zulidobariya/Documents/GitHub/odoo_agrisutra/AgriSutra/server/uploads/1743158130679_sample_image.jpeg	2025-03-28 16:05:31.06957
2	\N	1743158249987_sample.pdf	/Users/zulidobariya/Documents/GitHub/odoo_agrisutra/AgriSutra/server/uploads/1743158249987_sample.pdf	2025-03-28 16:07:30.055167
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, username, email, password, gender, date_of_birth, state, district, phone_number, profile_completed, created_at, updated_at, location_lat, location_lng, role) FROM stdin;
11	xyz	xyz	xyz@gmail.com	$2a$10$6jfoSf/ZK6.wijlXdJ5ScuioQBWWAG6tAUUBhRfT/F5fG9/BXw8eS	\N	\N	Gujarat	\N	\N	f	2025-03-02 03:04:15.155639	2025-03-02 03:59:22.75079	22.599411	72.817664	seeker
12	poq	poq	poq@gmail.com	$2a$10$0TND8mvqnQmtAVhSjLpSg.MJ6iae8NnkbyclqCzuKyDsyoWaOqh1S	\N	\N	Gujarat	\N	\N	f	2025-03-02 04:43:45.132841	2025-03-02 04:43:45.132841	\N	\N	seeker
2	zuli dobariya	sdscs	zulidobariya@gmail.com	$2a$10$b6yH58YszhC4N4qhzvbZo.AUx8JY2Hxb2jUQre8BuD7b97atbdZPK	\N	\N	\N	\N	7985447644	\N	2025-03-01 14:10:10.072494	2025-03-02 01:21:45.875225	\N	\N	seeker
7	ishita bhojani	ishu	ishita@gmail.com	$2a$10$VRDJ7hp8KUXZyZqiyenMnuo9sk0CvK8rbKEYnAibRCmNW0nUsbusm	\N	\N	Gujarat	\N	\N	f	2025-03-02 01:50:51.064718	2025-03-02 01:50:51.064718	\N	\N	seeker
3	zuli	24zuli	zulidobariya2410@gmail.com	$2a$10$zNxUZtL2obCsXQ/ZsnwPu.8wd6G38nWXuAYDyt13ac4T9O/3.RTGG	\N	\N	Gujarat	Ahmedabad	9876543210	t	2025-03-01 14:32:55.58301	2025-03-01 14:32:55.58301	23.022500	72.571400	seeker
4	pooja	pooju	poojamehta@gmail.com	$2a$10$CnkQyTmuhvj4EY.QmM3lGeeIrKornxEe2wSrmPAgS8hyruUPoneNW	\N	\N	Delhi	New Delhi	9998877665	t	2025-03-01 21:57:37.357565	2025-03-01 21:57:37.357565	28.704100	77.102500	seeker
5	22AIML005	ishita bhojani	22aiml027@gmail.com	$2a$10$9eMQZTGhjbpveeI/BH6Q1uVI71jUx7R5OgEUZZa6q8I9g4ozYDMzy	Female	\N	Gujarat	Surat	9871122334	t	2025-03-01 22:41:35.584614	2025-03-02 01:20:05.545661	21.170200	72.831100	seeker
6	pooja mehra	fdsfs	22aiml009	$2a$10$6byPZBUH1zbx9PIR7sfkUecF29nT/sLg47UzyrMRvfvB.1YA7P64m	Female	\N	Gujarat	Rajkot	9632587412	t	2025-03-02 01:23:24.715901	2025-03-02 01:24:19.688858	22.303900	70.802200	seeker
13	jkl	jkl	jkl@gmail.com	$2a$10$IG4U2GTSVlwMf2.ELJbRIuPyID95cdFlRIBYanzbRGSzzBG/yAmZu	\N	\N	Gujarat	\N	\N	f	2025-03-02 04:46:36.696304	2025-03-02 04:46:36.696304	\N	\N	seeker
14	ghj	ghj	ghj@gmail.com	$2a$10$OkpKsAieGFynzV5GGiUUE.bkCNDqy0nkla1ab/eNI2qmVuSYowM5S	\N	\N	Gujarat	\N	\N	f	2025-03-02 05:01:13.627666	2025-03-02 05:01:13.627666	\N	\N	seeker
15	cvb	cvb	cvb@gmail.com	$2a$10$98wc7iiKGUuQK9STfmBrgu9TxHQ6xwYux2pCWKYRONmeopfXOoj0K	\N	\N	Gujarat	\N	\N	f	2025-03-02 05:07:56.515441	2025-03-02 05:07:56.515441	\N	\N	seeker
1	nensi 	nensi1311	nensipansuriya1311@gmail.com	$2a$10$zUuk8JrWo3Oe7JFrwp5kcO6NQGaU52h74lHgg5wtMfSpgLjlV1GAW	Female	2004-10-20	gujarat	surat	8796543278	\N	2025-03-01 14:03:03.013253	2025-03-02 02:34:23.929223	22.599312	72.817709	seeker
9	ishitaaa	ishudw	ishu@gmail.com	$2a$10$RGyMQe.dPq.Ax3F3KuGK1OqoeAPKQzZilf89qiTzL81KPUnrkZSCK	\N	\N	Gujarat	\N	\N	f	2025-03-02 02:42:17.900544	2025-03-02 02:42:17.900544	\N	\N	seeker
10	abc	abc	abc@gmail.com	$2a$10$32bbBHUyiFq62JSVptDJz.f.V4MH1/2zSkXyPvLcib9.RKd4V16JO	\N	\N	Gujarat	\N	\N	f	2025-03-02 02:57:07.808724	2025-03-02 02:57:07.808724	\N	\N	seeker
16	nenu	nenu	nenu@gmail.com	$2a$10$SBR2dgnQHpH0QUdSmq8.9e9KFyOHz8zToBNUYngCsO9zcxjd9rBq2	\N	\N	Gujarat	\N	\N	f	2025-03-02 05:12:16.82012	2025-03-02 05:12:16.82012	\N	\N	seeker
17	nency dobariya	nency	nency@gmail.com	$2a$10$jQcv09I1YNUdEpYYGnZXzufjISCdF7U3haLtnplkib7Etv6pyeFxe	\N	\N	Gujarat	\N	\N	f	2025-03-02 05:24:33.202151	2025-03-02 05:24:33.202151	\N	\N	seeker
18	aiml	22aiml087	22aiml87@gmail.com	$2a$10$z90fv5w7o3PEkHgEPfcdFOiV.wlFleVuUsgzOT3DWjg.W8c9iKEO2	\N	\N	Gujarat	\N	\N	f	2025-03-02 05:33:31.559152	2025-03-02 05:33:31.559152	\N	\N	seeker
19	dfg	dfg	dfg@gmail.com	$2a$10$7eItJWNzaQH5OWztxbhim.PQaITRKvbWkMDSO/yVKWwygbJV45/6q	\N	\N	Gujarat	\N	\N	f	2025-03-02 05:38:42.695964	2025-03-02 05:38:42.695964	\N	\N	seeker
20	ert	ert	ert@gmail.com	$2a$10$F9KS8YQN2fpAfn5dXMLM7uQwfOJyXy1Qp.dU.ye9bzvctFSkCJUCm	\N	\N	Gujarat	\N	\N	f	2025-03-02 05:48:59.956253	2025-03-02 05:48:59.956253	\N	\N	seeker
21	qwe	qwe	qwe@gmail.com	$2a$10$cX9H54sW1PrSQ2Pr.KZVnOpThDcB0m4VZ/Pcf9c.toNsPC96tMVVu	\N	\N	Gujarat	\N	\N	f	2025-03-02 05:50:33.305532	2025-03-02 05:50:33.305532	\N	\N	seeker
22	hjk	hjk	hjk@gmail.com	$2a$10$57YjIUQJT2omMG1JTbMPNOV59WAzX1LJZVzYzbAwNN3nsI/PLbFWu	\N	\N	Gujarat	\N	\N	f	2025-03-02 05:56:59.404007	2025-03-02 05:56:59.404007	\N	\N	seeker
23	123	123	123@gmail.com	$2a$10$2UcJ078t7UDMUIt0Juw02OJC4Jk8wyVctTvDupSKHeQQSvNlBwRjq	\N	\N	Gujarat	\N	\N	f	2025-03-02 06:01:04.313154	2025-03-02 06:01:04.313154	\N	\N	seeker
24	234	234	234@gmail.com	$2a$10$JqWvlPRgQ1uHQ5FamklHjuSC79Fjzsng3rpwu/.gfbu3W6dzyUUYm	\N	\N	Gujarat	\N	\N	f	2025-03-02 06:16:15.548603	2025-03-02 06:16:15.548603	\N	\N	seeker
25	890	890	890@gmail.com	$2a$10$Xv1S1VtcX.O6JZ/PH3LmgO2hx7TShL8mUjqBYfUGoC9v9tgiwVTyC	\N	\N	Gujarat	\N	\N	f	2025-03-02 06:59:59.966747	2025-03-02 06:59:59.966747	\N	\N	seeker
26	irbhojani	irbhojani	irbhojani28@gmail.com	$2a$10$8XkLqbBrZ9kfyXEb4oFy/ORoLsIxvr0g6OQNTLBb0FlNBKQnvtpX.	\N	\N	Gujarat	\N	\N	f	2025-03-02 08:40:27.566411	2025-03-02 08:40:27.566411	\N	\N	seeker
27	22aiml	22aiml	22aiml@gmail.com	$2a$10$D3z8Fqiv4gddBJh1s1rWruLcX86kQItk4XY39yemNj8Y9BIZn409e	\N	\N	Gujarat	\N	1223455678	f	2025-03-02 08:58:02.604903	2025-03-02 09:17:38.754916	\N	\N	seeker
28	kiranben	kiranben	kiranbendobariya5@gmail.com	$2a$10$CQG9W1qIuqV7qV/nU3D7/eHc0iUqrYwISC0M80vSMZvInYBG0wWke	\N	\N	Gujarat	\N	\N	f	2025-03-02 09:24:13.941336	2025-03-02 09:24:13.941336	\N	\N	seeker
29	ishita bho	ishita2810	ishitabhojani2810@gmail.com	$2a$10$jDxIlH00MXJJqZ0K7IC1p.8YNsOflhIwSZxeMXZ/tTc6lf5a2vlmG	\N	\N	Gujarat	\N	6353477984	f	2025-03-02 09:31:07.560368	2025-03-02 10:04:16.097081	22.594132	72.816086	seeker
30	jvd	jvd	jvd@gmail.com	$2a$10$FsWs.Lv9B5dbuP3ALQ7EI.eDVQsi.WGKRSTvFLu.xxQ3yqudb/hCa	\N	\N	Gujarat	\N	9876543123	f	2025-03-15 11:38:21.870679	2025-03-15 17:04:46.589521	21.215525	72.891032	seeker
31	zjd	zjd	zjd@gmail.com	$2a$10$ehB4OEhIEnpkUPbnGQTnyefvNakkAJpAbL87TDLnZTjnOz8u.hqHG	\N	\N	Gujarat	\N	7984420655	f	2025-03-28 13:56:33.838553	2025-03-28 17:32:34.112758	22.601846	72.818021	seeker
\.


--
-- Name: bookings_booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_booking_id_seq', 4, true);


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 4, true);


--
-- Name: crops_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.crops_id_seq', 21, true);


--
-- Name: equipment_equipment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipment_equipment_id_seq', 10, true);


--
-- Name: saved_schemes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.saved_schemes_id_seq', 12, true);


--
-- Name: schemes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schemes_id_seq', 5, true);


--
-- Name: uploads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.uploads_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 31, true);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (booking_id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: crops crops_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crops
    ADD CONSTRAINT crops_name_key UNIQUE (name);


--
-- Name: crops crops_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crops
    ADD CONSTRAINT crops_pkey PRIMARY KEY (id);


--
-- Name: equipment equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_pkey PRIMARY KEY (equipment_id);


--
-- Name: saved_schemes saved_schemes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_schemes
    ADD CONSTRAINT saved_schemes_pkey PRIMARY KEY (id);


--
-- Name: schemes schemes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schemes
    ADD CONSTRAINT schemes_pkey PRIMARY KEY (id);


--
-- Name: uploads uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uploads
    ADD CONSTRAINT uploads_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_number_key UNIQUE (phone_number);


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
-- Name: bookings bookings_equipment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_equipment_id_fkey FOREIGN KEY (equipment_id) REFERENCES public.equipment(equipment_id) ON DELETE CASCADE;


--
-- Name: bookings bookings_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: equipment equipment_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id) ON DELETE SET NULL;


--
-- Name: equipment equipment_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipment
    ADD CONSTRAINT equipment_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: saved_schemes saved_schemes_scheme_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_schemes
    ADD CONSTRAINT saved_schemes_scheme_id_fkey FOREIGN KEY (scheme_id) REFERENCES public.schemes(id);


--
-- Name: saved_schemes saved_schemes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_schemes
    ADD CONSTRAINT saved_schemes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

