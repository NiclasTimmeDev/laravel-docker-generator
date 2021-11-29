export const updateDockerComposeConfig = config => {
  const newNetworkName = makeId(8);

  let new_config = updateServicesNetworks(config, newNetworkName);
  new_config = updateNetworkDefinition(new_config, newNetworkName);
  new_config = updateVolumes(new_config);
  return new_config;
};

/**
 * Create a random id of characters from the alphabet.
 *
 * @param {int} length
 *   The legth of the ID.
 *
 * @returns {string}
 *   The newly generated id.
 */
const makeId = length => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * Update the networks of all services of a given docker-compose object.
 *
 * @param {object} config
 *   The parsed docker-compose.yml file.
 * @param {*} newNetworkName
 *   The new name of the networks
 *
 * @returns {object}
 *   The updated config object.
 */
const updateServicesNetworks = (config, newNetworkName) => {
  let new_config = { ...config };
  const containers = Object.keys(config.services);
  containers.forEach(container => {
    new_config.services[container].networks[0] = newNetworkName;
  });

  return new_config;
};

/**
 * Update the network name of a parsed docker-compose.yml object.
 *
 * @param {object} config
 *   The parsed docker-compose.yml file.
 * @param {*} newNetworkName
 *   The new name of the networks
 *
 * @returns {object}
 *   The updated config object.
 */
const updateNetworkDefinition = (config, newNetworkName) => {
  let new_config = { ...config };

  new_config.networks = {};
  new_config.networks[newNetworkName] = {
    driver: 'bridge',
  };
  return new_config;
};

const updateVolumes = config => {
  let new_config = { ...config };

  const new_mysql_volume_name = makeId(9);
  new_config = updateContainerVolume(
    'database',
    config,
    'replace_by_new_mysql_volume_name',
    new_mysql_volume_name,
  );
  new_config = updateVolumeNames(config, new_mysql_volume_name);

  const new_redis_volume_name = makeId(9);
  new_config = updateContainerVolume(
    'redis',
    config,
    'replace_by_new_redis_volume_name',
    new_redis_volume_name,
  );
  new_config = updateVolumeNames(config, new_redis_volume_name);
  return new_config;
};

/**
 * Update the volume name of a container.
 *
 * @param {String} containerName
 *   The name of the container.
 * @param {object} config
 *   The parsed docker-compose.yml file.
 * @param {String} oldName
 *   The old name of the volume. Will be replaced with newName
 * @param {String} newName
 *   The new name of the volume.
 *
 * @returns {object}
 *   The updated config object.
 */
const updateContainerVolume = (containerName, config, oldName, newName) => {
  let new_config = { ...config };

  const old_name = config.services[containerName].volumes[0];
  const new_name = old_name.replace(oldName, newName);
  new_config.services[containerName].volumes[0] = new_name;
  return new_config;
};

/**
 * Create a new volume.
 *
 * @param {object} config
 *   The parsed docker-compose.yml file.
 * @param {String} volumeName
 *   The name of the new volume.
 *
 * @returns {object}
 *   The updated config object.
 */
const updateVolumeNames = (config, volumeName) => {
  let new_config = { ...config };
  new_config.volumes[volumeName] = {
    driver: 'local',
  };
  return new_config;
};
