/* eslint-disable max-len */
import React from 'react';

const PlutusLogo = (props: any) => {
  const { color = 'currentColor', width = '24', height = '24', className } = props;
  return (
    <span className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="98" viewBox="0 0 160 66"><path d="M71.149 31.885h3.124c1.87 0 3.014-1.034 3.014-2.64 0-1.65-1.144-2.706-3.014-2.706h-3.124v5.346zm3.52 1.936h-3.52v6.38h-2.156V24.603h5.676c2.882 0 4.818 2.002 4.818 4.62 0 2.64-1.936 4.598-4.818 4.598zm19.584 6.38v-2.024h-7.37V24.603h-2.156V40.2h9.526zm10.3.33c3.168 0 5.61-1.98 5.61-5.654V24.603h-2.156V34.81c0 2.376-1.254 3.718-3.454 3.718-2.178 0-3.476-1.342-3.476-3.718V24.603h-2.134v10.274c0 3.674 2.442 5.654 5.61 5.654zm22.774-13.926v-2.002h-12.584v2.002h5.214V40.2h2.156V26.605h5.214zm10.19 13.926c3.168 0 5.61-1.98 5.61-5.654V24.603h-2.156V34.81c0 2.376-1.254 3.718-3.454 3.718-2.178 0-3.476-1.342-3.476-3.718V24.603h-2.134v10.274c0 3.674 2.442 5.654 5.61 5.654zm21.894-12.386c-.352-1.694-1.76-3.872-5.28-3.872-2.882 0-5.148 2.2-5.148 4.642 0 2.332 1.584 3.784 3.806 4.268l2.222.484c1.562.33 2.332 1.298 2.332 2.42 0 1.364-1.056 2.486-3.212 2.486-2.354 0-3.586-1.606-3.74-3.344l-2.068.66c.286 2.222 2.068 4.642 5.83 4.642 3.322 0 5.39-2.2 5.39-4.62 0-2.178-1.452-3.806-4.048-4.378l-2.332-.506c-1.32-.286-2.002-1.144-2.002-2.266 0-1.452 1.254-2.596 3.014-2.596 2.178 0 3.124 1.54 3.3 2.662l1.936-.682zM33.458 44.455c1.872 2.296 3.809 4.67 1.696 7.337-.68.858-1.457 1.404-2.144 1.886-1.483 1.048-2.466 1.738-2.028 5.144l-1.8.236c-.582-4.508 1.132-5.713 2.79-6.881.641-.452 1.248-.878 1.762-1.53 1.096-1.38.448-2.418-1.679-5.029a52.342 52.342 0 01-1.24-1.56c-.73-.963-.997-2.031-.768-3.083.24-1.098.96-2.002 1.684-2.67-3.344-2.2-3.404-5.865-3.404-5.916h.907l.91-.005c.002.17.087 3.149 3.202 4.738l.225.113c1.052.492 2.435.823 4.236.86 7.506-.158 7.66-5.482 7.662-5.711l1.817.005c0 .018-.009.519-.181 1.253.868-.032 2.485-.327 3.073-.656-.335-1.21-2.483-5.196-4.456-8.493l.547-1.36.209-.058c-.313-1.425-.928-4.284-1.234-6.172-6.939-1.064-11.942-.253-14.873 2.418-2.83 2.584-2.66 6.006-2.653 6.152l-1.008.065-.804.067c-.04-.47-.365-.966-.76-1.152-.359-.169-.772-.088-1.23.239-.709.505-.962 1.144-.794 2.016.29 1.526 1.803 3.202 2.968 3.92.177-.11.305-.179.358-.209l.264.505c.037.012.08.15.08.15l.081.156.427.809a7.084 7.084 0 00-.873.579s-.091.104-.121.095c-.648.517-1.342 1.246-1.51 2.027-.112.524.03 1.038.437 1.576.4.526.806 1.026 1.199 1.508 1.872 2.298 3.808 4.673 1.697 7.34-.68.857-1.458 1.404-2.143 1.886-1.486 1.047-2.467 1.737-2.028 5.14l-1.8.237c-.582-4.506 1.132-5.713 2.788-6.879.64-.454 1.247-.88 1.764-1.529 1.093-1.383.448-2.419-1.68-5.03-.403-.495-.821-1.007-1.24-1.561-.732-.964-.996-2.032-.769-3.084.225-1.033.88-1.895 1.557-2.549-1.472-1.11-2.903-2.972-3.24-4.74-.302-1.57.243-2.942 1.531-3.862 1-.711 2.081-.853 3.044-.401.1.046.195.104.287.162a9.926 9.926 0 012.924-4.965c3.338-3.067 8.825-4.043 16.304-2.912 1.674-2.146 2.398-5.331-.478-8.028-2.64-2.47-7.26-3.2-10.428-.137l-1.516-.472c-.535-2.554-3.512-3.823-6.12-4.157-3.943-.507-9.093.78-11.075 4.808-2.635 5.342.753 8.04.898 8.153l-.595 1.647c-3.9-.216-6.521.43-7.794 1.918-1.644 1.923-.976 5.22-.438 7.87.45 2.218.806 3.97-.074 5.01-1.001 1.184-2.2 1.612-3.303 1.612a4.44 4.44 0 01-1.99-.475C.964 32.04.106 30.512.424 29.112l1.771.413c-.128.554.361 1.27 1.14 1.663.41.211 1.851.779 3.091-.688.304-.359-.073-2.222-.323-3.454-.618-3.042-1.386-6.828.842-9.434 1.418-1.657 3.793-2.512 7.227-2.59-1.064-1.699-2.008-4.65.011-8.747 2.38-4.826 8.37-6.397 12.934-5.81 3.455.444 6.078 2.024 7.197 4.248 3.852-2.77 8.894-1.797 11.873.994 2.363 2.213 3.932 6.228.772 10.378.324 2.31 1.474 7.395 1.486 7.448l-.588.983c4.704 7.986 4.268 8.841 4.054 9.263-.443.866-2.07 1.364-3.519 1.566 1.711 1.144 3.372 3.128 3.255 6.135-.092 2.359-1.868 4.265-3.583 6.107-2.302 2.47-3.648 4.083-2.382 6.022l-1.516 1.008c-2.12-3.246.374-5.922 2.574-8.285 1.489-1.597 3.028-3.249 3.092-4.924.131-3.35-2.699-4.798-3.804-5.236-1.18 1.796-3.466 3.582-7.887 3.746v.017c-.115 0-.22-.007-.333-.01-.113.003-.219.01-.333.01v-.017c-1.576-.057-2.88-.322-3.958-.72-.694.523-1.512 1.316-1.695 2.17-.113.524.03 1.041.438 1.576.398.529.807 1.029 1.2 1.51zm-13.07-32.24l1.399 1.17c-.857 1.042-.366 1.94-.115 2.28.409.553 1.176.956 1.851.664 1.149-.496 1.32-.755 2.286-2.182a60.017 60.017 0 012.398-3.341c1.183-1.546 2.545-2.359 4.042-2.42 2.396-.09 4.165 1.833 4.238 1.917l-1.344 1.235c-.011-.014-1.29-1.386-2.832-1.319-.932.04-1.83.614-2.669 1.706a62.73 62.73 0 00-2.331 3.253c-1.015 1.503-1.436 2.127-3.069 2.835a3.016 3.016 0 01-1.201.248c-1.052 0-2.111-.537-2.826-1.499-1.026-1.385-.96-3.171.173-4.548zm19.795 38.301c1.87 2.296 3.807 4.673 1.693 7.338-.677.857-1.454 1.404-2.14 1.888-1.487 1.045-2.467 1.735-2.029 5.141l-1.803.237c-.579-4.509 1.135-5.714 2.791-6.882.64-.451 1.247-.878 1.764-1.529 1.093-1.38.446-2.418-1.679-5.03a49.68 49.68 0 01-1.24-1.561c-.733-.964-.997-2.03-.77-3.082.5-2.303 3.129-3.765 3.427-3.924l.852 1.62c-.604.326-2.235 1.445-2.503 2.698-.113.524.03 1.038.436 1.576.4.528.806 1.028 1.201 1.51zM21.45 21.396c-5.359-.202-8.159.961-8.327 3.459-.069.996.014 2.17.104 3.415.218 3.035.466 6.478-1.571 8.526-1.114 1.122-2.734 1.673-4.932 1.673-.356 0-.73-.014-1.116-.042L5.74 36.6c2.219.165 3.732-.194 4.63-1.1 1.45-1.458 1.243-4.324 1.043-7.097-.094-1.309-.181-2.546-.105-3.674.172-2.524 2.083-5.47 10.207-5.165l-.066 1.833zm22.103 3.117c-.028-.044-.685-1.045-2.5-1.045-1.697 0-4.086 1.668-4.864 2.312l-1.085-1.337c.134-.111 3.299-2.701 5.95-2.701 2.83 0 3.92 1.802 3.964 1.879l-.737.44-.728.452zm-2.996 1.68c0-.595.542-1.077 1.21-1.077.669 0 1.213.482 1.213 1.078 0 .595-.544 1.077-1.213 1.077-.668 0-1.21-.482-1.21-1.077z" fill="#d1ae52" fillRule="evenodd"/></svg>
    </span>
  );
};

export default PlutusLogo;