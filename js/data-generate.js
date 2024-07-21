import { getRandom } from './util.js';
const DESCRIPTIONS = [
  '🌟 Живу, мечтаю, создаю.',
  '✈️ Вечно на пути к новому приключению.',
  '📸 Захватываю моменты жизни.',
  '🎨 Творю искусство в каждом дне.',
  '🍕 Пицца и радость жизни.',
  '📚 Погружаюсь в мир книг и знаний.',
  '🌿 Живу в гармонии с природой.',
  '🏋️‍♂️ Постоянно совершенствую себя.',
  '🌟 Следую за мечтами.',
  '🌍 Исследую мир, одну страну за раз.',
  '🎵 Мелодия моей жизни.',
  '🥑 Люблю здоровую пищу и фитнес.',
  '📈 Постоянно учусь и расту.',
  '🎬 Кино и жизнь – две великие драмы.',
  '💡 Идеи и вдохновение в каждом дне.',
  '🍃 Найди красоту в простых вещах.',
  '🌺 Цветы – моя страсть и вдохновение.',
  '🍦 Ловлю сладкие моменты жизни.',
  '📖 Пишу свою собственную историю.',
  '🌠 Мечты без границ.',
  '🌸 Ценю каждое мгновение.',
  '🚴‍♂️ Живу активно и энергично.',
  '💼 Работай усердно, играй еще усерднее.',
  '🧘‍♂️ На пути к внутреннему спокойствию.',
  '🌞 Приношу свет в каждый день.',
];

const MESSAGES = [
  'Это просто потрясающе! Мне нужно срочно узнать, где этот рай на земле находится. 😍',
  'Вау, такое ощущение, что вы поймали единорога в кадр! 🦄',
  'Как вам удалось так красиво сфотографировать место, где я бывал в своих мечтах? 😆',
  'Это фото такое яркое, что мне пришлось надеть солнцезащитные очки, чтобы его разглядеть. 😎',
  'Ваше фото - как отпуск, который я не могу себе позволить. 😂',
  'Если бы у меня был талант к фотографии, я бы делал такие же крутые снимки, как у вас! 📸',
  'Это просто искусство! Надеюсь, у вас нет аллергии на похвалу. 🌟',
  'Кажется, я нашел идеальное место для своего следующего отпуска! Спасибо за вдохновение. 🏖️',
  'Эта фотография такая красивая, что даже мой кот посмотрел на нее с одобрением. 🐱',
  'Невероятно! Это место действительно существует или это фотошоп? 😜',
  'Если бы я мог, я бы поставил этому фото миллион лайков. 💯',
  'Ваши фотографии всегда поднимают мне настроение. Даже когда я сижу в офисе. 🌞',
  'Это фото настолько потрясающее, что я забыл, что хотел написать. О, вот оно! 😂',
  'Как вы находите такие красивые места? У вас есть карта сокровищ? 🗺️',
  'Ваши снимки - как глоток свежего воздуха в этом душном мире. 🌬️',
  'Если бы ваше фото было песней, оно бы стало хитом номер один! 🎶',
  'Каждый ваш снимок - как маленькое приключение, в которое хочется отправиться. 🚀',
  'Эта фотография такая шикарная, что даже моя бабушка бы одобрила. И это редкость! 😄',
  'Ваши фото такие яркие и живые, что мне кажется, что я могу услышать их. 📸',
  'Я думал, что видел все, но это фото изменило мое мнение. Просто великолепно! 🌈',
  'Ваши фотографии всегда такие красивые, что мне хочется немедленно отправиться в путешествие. 🌍',
  'Это фото так хорошо, что я готов поспорить, что вы подкупили природу. 😂',
  'Я бы хотел быть на этом месте прямо сейчас. Или хотя бы на вашем месте с такой камерой. 📷'
];


const NAMES = [
  'Алексей',
  'Ольга',
  'Дмитрий',
  'Наталья',
  'Михаил',
  'Екатерина',
  'Иван',
  'Марина',
  'Сергей',
  'Алина',
  'Андрей',
  'Юлия',
  'Владимир',
  'Анна',
  'Николай',
  'Елена',
  'Павел',
  'Светлана',
  'Артём',
  'Виктория',
  'Роман',
  'Татьяна',
  'Максим',
  'Лариса',
  'Денис',
];

const Avatar = {
  MIN: 1,
  MAX: 6,
};

const Message = {
  MIN: 1,
  MAX: 2,
};

const Like = {
  MIN: 15,
  MAX: 300,
};

const Comment = {
  MIN: 1,
  MAX: 30,
};

const getRandomArrayElement = (elements) => elements[getRandom(0, elements.length - 1)];

const usedPictureIds = new Set();
const usedPicture = new Set();
const usedCommentIds = new Set();

const generateUniqueId = (usedIds, min, max) => {
  let id;
  do {
    id = getRandom(min, max);
  } while (usedIds.has(id));
  usedIds.add(id);
  return id;
};

const getComment = () => ({
  id: generateUniqueId(usedCommentIds, 1, 5000),
  avatar: `img/avatar-${getRandom(Avatar.MIN, Avatar.MAX)}.svg`,
  message: Array.from({ length: getRandom(Message.MIN, Message.MAX) }, () => getRandomArrayElement(MESSAGES)),
  name: getRandomArrayElement(NAMES),
});

const getPicture = () => ({
  id: generateUniqueId(usedPictureIds, 1, 25),
  url: `photos/${generateUniqueId(usedPicture, 1 , 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandom(Like.MIN, Like.MAX),
  comments: Array.from({ length: getRandom(Comment.MIN, Comment.MAX) }, () => getComment()),
});

const createPictures = (pictureQnty) => Array.from({ length: pictureQnty }, () => getPicture());

const arrayPic = createPictures()

export {arrayPic, createPictures, getPicture};
