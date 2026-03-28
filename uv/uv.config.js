self.__uv$config = {
    prefix: '/service/',
    bare: 'https://uv.student-portal.cloud/bare/', 
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.0.2/dist/uv.handler.js',
    bundle: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.0.2/dist/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.0.2/dist/uv.sw.js',
};
