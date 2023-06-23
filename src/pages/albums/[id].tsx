import { useRouter } from "next/router";
import Layout from "../../layouts";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Image from "next/image";
import { Album } from "../../types/album";
import { getAlbumReleaseYear } from "../../services/album";
import ArtistUtil from "../../utils/ArtistUtil";
import TrackUtil from "../../utils/TrackUtil";
import { Clock1, Star, StarHalf } from "lucide-react";

export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query;
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    api.get("/albums/by-id/" + id).then((response) => {
      setAlbum(response.data);
    });
  }, [id]);

  album?.tracks.sort((a, b) => a.number - b.number);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row space-x-12">
          <div className="flex flex-col">
            <Image
              src={album?.image_url}
              width={288}
              height={288}
              alt="Picture of the author"
              className="flex-shrink-0"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-line items-center text-gray-200 space-x-2">
              <div className="text-2xl font-medium">{album?.name}</div>
              <div className="text-xl font-light">
                by {album?.artists[0].name}
              </div>
              <div className="text-xl font-light">
                ({getAlbumReleaseYear(album?.release_date)})
              </div>
            </div>
            <div className="flex text-gray-200">
              <Star fill="white" width={20}></Star>
              <Star fill="white" width={20}></Star>
              <Star fill="white" width={20}></Star>
              <Star fill="white" width={20}></Star>
              <div className="relative flex">
                <Star></Star>
                <StarHalf fill="white" className="absolute"></StarHalf>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-gray-200">
          <div className="flex space-x-4">
            <div className="text-xl">Tracks</div>
          </div>
          <div className="relative overflow-x-auto">
            <table className="text-sm text-left mt-4 text-gray-200 w-full">
              <thead className="text-xs uppercase">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" className="px-6 py-2">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-2">
                    <Clock1 width={14} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {album?.tracks.map((track) => {
                  return (
                    <tr key={track.id}>
                      <td>{track.number}</td>
                      <td
                        scope="row"
                        className="px-6 py-2 font-medium whitespace-nowrap flex-1"
                      >
                        <div className="flex flex-row">{track.name}</div>
                        <div className="flex flex-row font-light">
                          {ArtistUtil.getArtistsName(track.artists)}
                        </div>
                      </td>
                      <td className="px-6 py-2">
                        {TrackUtil.getMinutage(track.duration_ms)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* <table className="table-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {/* {album.tracks.map((track) => {
                return (
                  <tr key={track.id}>
                    <td>{track.number}</td>
                    <td>{track.name}</td>
                  </tr>
                );
              })} */}
          {/* </tbody> */}
          {/* </table> */}
        </div>
      </div>
    </Layout>
  );
}