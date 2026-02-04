function hasRole(member, roleId) {
  return member.roles.cache.has(roleId);
}

module.exports = { hasRole };
