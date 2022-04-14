/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore } from 'redux';

/**
 * Глобальное хранилище
 * для передачи состояния между компонентами
 * работает только между перезагрузками окна браузера
 */

// Типы возможных состояний хранилища
type StoreType = 'INITIAL' | 'SWIPER_BLOCKED';

/**
 * Элемент хранилища
 */
interface ReducerItem<T extends StoreType, K> {
  type: T;
  value: K;
}

/**
 * Интерфейс хранилища
 * содержит описание выделенных полей
 * для того или иного события
 */
interface Reducer {
  type: StoreType;
  swiperBlocked?: ReducerItem<'SWIPER_BLOCKED', boolean>;
}

/**
 * Редусер содержит простой переключатель
 * для добавления нужного поля в соответствующем кейсе
 */
// eslint-disable-next-line default-param-last
function reducer(state: Reducer = { type: 'INITIAL' }, action: ReducerItem<any, any>) {
  const _state = { ...state };
  _state.type = action.type;
  switch (action.type) {
    case 'SWIPER_BLOCKED':
      _state.swiperBlocked = action;
      break;
    default:
      break;
  }
  return _state;
}

const store = createStore(reducer);

export { store };
