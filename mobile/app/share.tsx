import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Copy, Check, ChevronDown, Plus } from 'lucide-react-native';
import { Colors } from '../src/theme/colors';

export default function InviteAndSharePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'link' | 'code'>('link');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [permission, setPermission] = useState<'edit' | 'view'>('edit');

  const shareUrl = 'https://blueprintlabs.com/invite/NP-7X3KB';
  const joinCode = 'NP-7X3KB';

  const collaborators = [
    { id: '1', name: 'Saketh (You)', email: '', role: 'Owner', avatar: 'S' },
    { id: '2', name: 'Ananya', email: 'ananya@example.com', role: 'Can Edit', avatar: 'A' },
    { id: '3', name: 'Rahul', email: 'rahul@example.com', role: 'Can View', avatar: 'R' },
  ];

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Invite People</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Invite Link / Join Code Segmented Toggle */}
        <View style={styles.segmentedToggle}>
          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'link' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('link')}
          >
            <Text style={[styles.segmentText, activeTab === 'link' && styles.segmentTextActive]}>
              Invite Link
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'code' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('code')}
          >
            <Text style={[styles.segmentText, activeTab === 'code' && styles.segmentTextActive]}>
              Join Code
            </Text>
          </TouchableOpacity>
        </View>

        {/* Share Link Box */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Share this link</Text>
          <View style={styles.copyBox}>
            <Text style={styles.copyText} numberOfLines={1}>
              {shareUrl}
            </Text>
            <TouchableOpacity style={styles.copyIconButton} onPress={handleCopyLink}>
              {copiedLink ? (
                <Check size={18} color={Colors.success} />
              ) : (
                <Copy size={18} color={Colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider OR */}
        <View style={styles.orDividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Join Code Box */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Join Code</Text>
          <View style={styles.codeBox}>
            <Text style={styles.codeText}>{joinCode}</Text>
            <TouchableOpacity style={styles.copyIconButton} onPress={handleCopyCode}>
              {copiedCode ? (
                <Check size={18} color={Colors.success} />
              ) : (
                <Copy size={18} color={Colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Default Permission Selector */}
        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Permissions</Text>
          <TouchableOpacity
            style={styles.permissionDropdown}
            activeOpacity={0.8}
            onPress={() => setPermission(permission === 'edit' ? 'view' : 'edit')}
          >
            <Text style={styles.permissionValue}>
              {permission === 'edit' ? 'Can Edit' : 'Can View'}
            </Text>
            <ChevronDown size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* People with Access (Collaborator List) */}
        <View style={styles.peopleSection}>
          <Text style={styles.peopleHeading}>People with access</Text>

          {collaborators.map((c) => (
            <View key={c.id} style={styles.collaboratorRow}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{c.avatar}</Text>
              </View>
              <View style={styles.collaboratorDetails}>
                <Text style={styles.collaboratorName}>{c.name}</Text>
                {c.email ? <Text style={styles.collaboratorEmail}>{c.email}</Text> : null}
              </View>
              {c.role === 'Owner' ? (
                <Text style={styles.ownerBadge}>Owner</Text>
              ) : (
                <View style={styles.roleDropdownPill}>
                  <Text style={styles.roleDropdownText}>{c.role}</Text>
                  <ChevronDown size={14} color={Colors.textSecondary} />
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Invite More People CTA Button */}
        <TouchableOpacity
          style={styles.inviteMoreButton}
          activeOpacity={0.85}
          onPress={() => alert('Invitation link copied to clipboard!')}
        >
          <Plus size={18} color={Colors.primary} />
          <Text style={styles.inviteMoreText}>Invite More People</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    paddingHorizontal: 22,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    marginBottom: 8,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  segmentedToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 4,
    marginVertical: 12,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  segmentBtnActive: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  section: {
    marginVertical: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  copyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  copyText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textPrimary,
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  codeText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 2,
  },
  copyIconButton: {
    padding: 4,
  },
  orDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  permissionDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Colors.white,
  },
  permissionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  peopleSection: {
    marginTop: 20,
    marginBottom: 16,
  },
  peopleHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  collaboratorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surface,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.secondaryLight,
    borderWidth: 1,
    borderColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.secondary,
  },
  collaboratorDetails: {
    flex: 1,
  },
  collaboratorName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  collaboratorEmail: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 1,
  },
  ownerBadge: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  roleDropdownPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  roleDropdownText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  inviteMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 13,
    backgroundColor: Colors.white,
    marginTop: 12,
  },
  inviteMoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
});
