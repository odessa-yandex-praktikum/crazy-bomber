import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {IAppState} from '../index';

export const useTypedSelector: TypedUseSelectorHook<IAppState> = useSelector;
