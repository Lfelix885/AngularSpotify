import { IUsuario } from '../interfaces/IUsuario';

export function SpotifyUserParaUsuario(
  user: SpotifyApi.CurrentUsersProfileResponse
) {
  return {
    id: user.id,
    imagemUrl: user.images.pop().url,
    nome: user.display_name,
  };
}
