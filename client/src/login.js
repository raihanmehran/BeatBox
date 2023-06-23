import React from "react";
import { Container } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=a6df095652924761a9a010ffd4b3b3aa&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <Container>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Spotify Login
      </a>
    </Container>
  );
}
